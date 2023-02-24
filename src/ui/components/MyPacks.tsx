import React, {useCallback, useEffect, useState} from 'react';
import style from "./packListPage/Packlist.module.scss";
import Button from "../common/components/commonButton/Button";
import {Debounce} from "./packListPage/Debounce";
import {NavLink} from "react-router-dom";
import {TableCards} from "./packListPage/TableCards";
import {
    removePackTC,
    setMyCardsPacksTC, setMyPackTC,
    setPageCountAC, setPageNumberAC,
    setSearchValueAC, setSortPacksAC,
    updatePackTC
} from "../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {useDebounce} from "usehooks-ts";
import {CardPacksType} from "../../dal/api/authApi";
import {List} from "./packListPage/List";
import AddEditPackList from "./modalPages/packModal/AddEditPackList";
import RemovePackCard from "./modalPages/RemovePackCard";

export const MyPacks = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const sortPacks = useAppSelector(state => state.packList.sortPacks)
    const searchValue = useAppSelector(state => state.packList.searchValue)
    const pageCount = useAppSelector(state => state.packList.pageCount)
    const page = useAppSelector(state => state.packList.page)
    const cardPacks = useAppSelector(state => state.packList.cardPacks)
    const cardPacksTotalCount = useAppSelector(state => state.packList.cardPacksTotalCount)
    const user_id = useAppSelector(state => state.profile._id)


    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)
    const [openModalAddPack, setOpenModalAddPack] = useState(false);
    const [openModalRemovePack, setOpenModalRemovePack] = useState(false);
    const [currentList, setCurrentList] = useState<CardPacksType>()


    useEffect(() => {
        dispatch(setSearchValueAC(debouncedValue))
    }, [debouncedValue])

    useEffect(() => {
        dispatch(setMyCardsPacksTC(page, pageCount, sortPacks, user_id))
    }, [sortPacks, searchValue, pageCount, page])

    const updatePack = useCallback((id: string, name: string) => {
        dispatch(updatePackTC(id, name));
    }, [])

    const remPack = useCallback((id: string) => {
        dispatch(removePackTC(id))
    }, [])

    const finalPackList = cardPacks.map((el: CardPacksType) => <List openModalRemovePack={true}
                                                                     setOpenModalRemovePack={() => {
                                                                     }} key={el._id} remCallBack={remPack}
                                                                     callBack={updatePack} list={el}
                                                                     testHandler={() => {
                                                                     }}/>)

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
        dispatch(setMyPackTC('add'));
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
                            onChangePagination={onChangePagination} onChangeSort={onChangeSort}/>
                }
            </div>
            {openModalAddPack && <AddEditPackList openModal={openModalAddPack} setOpenModal={setOpenModalAddPack}
                                                  text={"Add New Pack"}/>}
            {openModalRemovePack &&
                <RemovePackCard list={currentList} openModal={openModalRemovePack}
                                setOpenModal={setOpenModalRemovePack}/>}

        </div>
    )
};

