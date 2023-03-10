import React, {useCallback, useEffect, useState} from 'react';
import {
    removePackTC,
    setCardsPacksTC, setMinMaxCardsQuantityAC,
    setPageCountAC,
    setPageNumberAC,
    setSearchValueAC,
    setSortPacksAC, updatePackTC
} from "../../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {CardPacksType} from "../../../dal/api/authApi";
import {List} from "./List";
import Button from "../../common/components/commonButton/Button";
import {Debounce} from "./Debounce";
import {useDebounce} from "usehooks-ts";
import style from './Packlist.module.scss'
import {SliderComponent} from "./SliderComponent";
import {TableCards} from "./TableCards";
import {Navigate, NavLink, useSearchParams} from "react-router-dom";
import AddEditPackList from "../modalPages/packModal/AddEditPackList";
import {RemovePackCard} from "../modalPages/RemovePackCard";
import {setMyOrAllCards} from "../../../bll/reducers/app";
import {ResetFilter} from "./ResetFilter";
import {UpdatePackCard} from "../modalPages/UpdatePackCard";

export const PackList = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const sortPacks = useAppSelector(state => state.packList.sortPacks)
    const searchValue = useAppSelector(state => state.packList.searchValue)
    const pageCount = useAppSelector(state => state.packList.pageCount)
    const page = useAppSelector(state => state.packList.page)
    const cardPacks = useAppSelector(state => state.packList)
    const cardPacksTotalCount = useAppSelector(state => state.packList.cardPacksTotalCount)
    const minCardsCount = useAppSelector(state => state.packList.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)
    const myOrAllCards = useAppSelector(state => state.app.myOrAllCards)
    const [searchParams, setSearchParams] = useSearchParams()

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)
    const [min, setMin] = useState(minCardsCount)
    const [max, setMax] = useState(cardPacks.maxCardsCount)
    const debounceMin = useDebounce(min, 1000)
    const debounceMax = useDebounce(max, 1000)
    const [openModalAddPack, setOpenModalAddPack] = useState(false);
    const [openModalRemovePack, setOpenModalRemovePack] = useState(false);
    const [openModalUpdatePack, setOpenModalUpdatePack] = useState(false);
    const [currentList, setCurrentList] = useState<CardPacksType>()

    useEffect(() => {
        dispatch(setMyOrAllCards({value: 'all'}))
    }, [])

    useEffect(() => {
        setMax(maxCardsCount)
    }, [maxCardsCount])

    useEffect(() => {
        dispatch(setMinMaxCardsQuantityAC(min, max))
        setMax(debounceMax)
        setMin(debounceMin)
    }, [debounceMin, debounceMax])

    useEffect(() => {
        dispatch(setSearchValueAC(debouncedValue))
        setSearchParams({
            page: page.toString(),
            pageCount: pageCount.toString(),
            sortPacks: sortPacks,
            packName: debouncedValue
        })
    }, [debouncedValue])


    useEffect(() => {
        dispatch(setCardsPacksTC())
    }, [sortPacks, searchValue, pageCount, page, debounceMin, debounceMax])


    const remPack = useCallback((id: string) => {
        dispatch(removePackTC(id))
    }, [])

    const updatePack = (id: string, title: string) => {
        dispatch(updatePackTC(id, title))
    }

    const deleteHandler = (list: CardPacksType) => {
        setOpenModalRemovePack(true)
        setCurrentList(list)
    }
    const updateHandler = (list: CardPacksType) => {
        setOpenModalUpdatePack(true)
        setCurrentList(list)
    }

    const finalPackList = cardPacks.cardPacks.map((el: CardPacksType) => {
            return <List
                updateHandler={updateHandler}
                deleteHandler={deleteHandler}
                key={el._id}
                list={el}
            />
        }
    )

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(setPageCountAC(newCount))
        dispatch(setPageNumberAC(newPage))
        setSearchParams({page: page.toString(), pageCount: pageCount.toString(), sortPacks: sortPacks})
    }

    const onChangeSort = (newSort?: string) => {
        if (newSort) {
            dispatch(setSortPacksAC(newSort))
            setSearchParams({page: page.toString(), pageCount: pageCount.toString(), sortPacks: sortPacks})
        }
    }

    const onClickAllPacksHandler = () => {
        dispatch(setCardsPacksTC())
    }

    const addPack = () => {
        setOpenModalAddPack(!openModalAddPack)
    }

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.packsContainer}>
            <div className={style.headBlock}>
                <h4>Packs list</h4>
                <Button onClickCallBack={addPack} title={'Add new pack'}/>
            </div>
            <div className={style.searchBlock}>
                <Debounce setValue={setValue} value={value}/>
                <div>
                    <h4>Show packs cards</h4>
                    <div className={style.divLink}>
                        <NavLink className={style.link} to={'/myPack'}>My</NavLink>
                    </div>
                    <Button onClickCallBack={onClickAllPacksHandler} title={'All'}/>
                </div>
                <SliderComponent maxCardsCount={maxCardsCount} setMin={setMin} setMax={setMax} min={min} max={max}/>
                <ResetFilter/>
            </div>
            <div className={style.table}>
                {
                    cardPacks.cardPacks.length === 0
                        ? <h2>'Add new packs'</h2>
                        : <TableCards
                            sortPacks={sortPacks} page={page} pageCount={pageCount}
                            cardPacksTotalCount={cardPacksTotalCount} finalPackList={finalPackList} status={status}
                            onChangePagination={onChangePagination} onChangeSort={onChangeSort}/>
                }
            </div>
            {
                openModalAddPack && <AddEditPackList
                    myOrAllCards={myOrAllCards}
                    openModal={openModalAddPack}
                    setOpenModal={setOpenModalAddPack}
                    text={"Add New Pack"}
                />
            }
            {
                openModalRemovePack && <RemovePackCard
                    list={currentList}
                    openModal={openModalRemovePack}
                    setOpenModal={setOpenModalRemovePack}
                    removeCallBack={remPack}
                />
            }
            {
                openModalUpdatePack && <UpdatePackCard
                    list={currentList}
                    openModal={openModalUpdatePack}
                    setOpenModal={setOpenModalUpdatePack}
                    updateCallBack={updatePack}
                />
            }

        </div>

    )
}