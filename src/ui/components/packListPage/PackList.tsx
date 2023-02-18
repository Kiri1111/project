import React, {useCallback, useEffect, useState} from 'react';
import {
    removePackTC,
    setCardsPacksTC,
    setMyCardsPacksTC, setPackTC,
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
import {RangeSlider} from "./SliderComponent";
import {TableCards} from "./TableCards";

export const PackList = () => {
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
    const [request, setRequest] = useState(true)

    useEffect(() => {
        dispatch(setSearchValueAC(debouncedValue))
    }, [debouncedValue])


    useEffect(() => {
        if (sortPacks !== '0updated' && searchValue !== '' && pageCount !== 10 && page !== 1) {
            dispatch(setCardsPacksTC())
        }
        if (request) {
            dispatch(setCardsPacksTC())
            setRequest(false)
        }
    }, [sortPacks, searchValue, pageCount, page])

    const updatePack = useCallback((id: string, name: string) => {
        dispatch(updatePackTC(id, name));
    }, [])

    const remPack = useCallback((id: string) => {
        dispatch(removePackTC(id))
    }, [])

    const finalPackList = cardPacks.map((el: CardPacksType) => <List key={el._id} remCallBack={remPack}
                                                                     callBack={updatePack} list={el}/>)
    const onChangePagination = (newPage: number, newCount: number) => {
        dispatch(setPageCountAC(newCount))
        dispatch(setPageNumberAC(newPage))
    }

    const onChangeSort = (newSort?: string) => {
        if (newSort) {
            dispatch(setSortPacksAC(newSort))
        }
    }

    const onClickMyPacksHandler = () => {
        dispatch(setMyCardsPacksTC(1, pageCount, sortPacks, user_id))
    }

    const onClickAllPacksHandler = () => {
        dispatch(setCardsPacksTC())
    }

    const addPack = () => {
        dispatch(setPackTC('add'));
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
                    <Button onClickCallBack={onClickMyPacksHandler} title={'My'}/>
                    <Button onClickCallBack={onClickAllPacksHandler} title={'All'}/>
                </div>
                <RangeSlider/>
            </div>
            <div className={style.table}>
                <TableCards
                    sortPacks={sortPacks} page={page} pageCount={pageCount}
                    cardPacksTotalCount={cardPacksTotalCount} finalPackList={finalPackList} status={status}
                    onChangePagination={onChangePagination} onChangeSort={onChangeSort}/>
            </div>
        </div>
    )
}


