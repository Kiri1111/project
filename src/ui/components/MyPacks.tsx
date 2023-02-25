import React, {useCallback, useEffect, useState} from 'react';
import style from "./packListPage/Packlist.module.scss";
import Button from "../common/components/commonButton/Button";
import {Debounce} from "./packListPage/Debounce";
import {NavLink} from "react-router-dom";
import {TableCards} from "./packListPage/TableCards";
import {
    removePackTC,
    setMyCardsPacksTC,
    setPageCountAC, setPageNumberAC,
    setSearchValueAC, setSortPacksAC,
    updatePackTC
} from "../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useDebounce} from "usehooks-ts";
import {CardPacksType} from "../../dal/api/authApi";
import {List} from "./packListPage/List";
import AddEditPackList from "./modalPages/packModal/AddEditPackList";
import {RemovePackCard} from "./modalPages/RemovePackCard";
import {setMyOrAllCards} from "../../bll/reducers/app";

export const MyPacks = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const sortPacks = useAppSelector(state => state.packList.sortPacks)
    const searchValue = useAppSelector(state => state.packList.searchValue)
    const pageCount = useAppSelector(state => state.packList.pageCount)
    const page = useAppSelector(state => state.packList.page)
    const cardPacks = useAppSelector(state => state.packList.cardPacks)
    const cardPacksTotalCount = useAppSelector(state => state.packList.cardPacksTotalCount)
    const myOrAllCards = useAppSelector(state => state.app.myOrAllCards)

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)
    const [openModalAddPack, setOpenModalAddPack] = useState(false);
    const [openModalRemovePack, setOpenModalRemovePack] = useState(false);
    const [currentList, setCurrentList] = useState<CardPacksType>()

    useEffect(() => {
        dispatch(setMyOrAllCards({value: 'my'}))
    }, [])

    useEffect(() => {
        dispatch(setSearchValueAC(debouncedValue))
    }, [debouncedValue])

    useEffect(() => {
        dispatch(setMyCardsPacksTC())
    }, [sortPacks, searchValue, pageCount, page])

    const updatePack = useCallback((id: string, name: string) => {
        dispatch(updatePackTC(id, name));
    }, [])

    const remPack = useCallback((id: string) => {
        dispatch(removePackTC(id))
    }, [])

    const testHandler = (list: CardPacksType) => {
        setOpenModalRemovePack(true)
        setCurrentList(list)
    }

    const finalPackList = cardPacks.map((el: CardPacksType) => <List
        key={el._id}
        callBack={updatePack}
        list={el}
        testHandler={testHandler}
    />)

    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(setPageCountAC(newCount))
        dispatch(setPageNumberAC(newPage))
    }

    const onChangeSort = (newSort?: string) => {
        if (newSort) {
            dispatch(setSortPacksAC(newSort))
        }
    }

    const addPack = () => {
        setOpenModalAddPack(!openModalAddPack)
    }

    return (
        <div className={style.packsContainer}>
            <div className={style.headBlock}>
                <NavLink className={style.link} to={'/packList'}>&#8656; Back to Pack list </NavLink>
                <Button onClickCallBack={addPack} title={'Add new pack'}/>
            </div>
            <div className={style.searchBlock}>
                <Debounce setValue={setValue} value={value}/>
            </div>
            <div className={style.table}>
                {
                    cardPacks.length === 0
                        ? <h2>'Add new packs'</h2>
                        : <TableCards
                            sortPacks={sortPacks} page={page} pageCount={pageCount}
                            cardPacksTotalCount={cardPacksTotalCount} finalPackList={finalPackList} status={status}
                            onChangePagination={onChangePagination} onChangeSort={onChangeSort}
                        />
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

        </div>
    )
};

