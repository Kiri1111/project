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
import {Preloader} from "../../common/components/preloader/Preloader";
import {CardPacksType} from "../../../dal/api/authApi";
import {List} from "./List";
import {PaginationComponent} from "./Pagination";
import {SortComponent} from "./SortComponent";
import Button from "../../common/components/commonButton/Button";
import {Debounce} from "./Debounce";
import {useDebounce} from "usehooks-ts";
import s from './Packlist.module.css'
import RangeSlider from "./SliderComponent";

export const PackList = () => {
    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packList)
    const user_id = useAppSelector(state => state.profile._id)


    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)

    useEffect(() => {

        dispatch(setSearchValueAC(debouncedValue))
    }, [debouncedValue])


    useEffect(() => {
        dispatch(setCardsPacksTC())
    }, [packs.sortPacks, packs.searchValue, packs.pageCount, packs.page, packs.sortPacks])

    const updatePack = useCallback((id: string, name: string) => {
        dispatch(updatePackTC(id, name));
    }, [])

    const remPack = useCallback((id: string) => {
        dispatch(removePackTC(id))
    }, [])


    const finalPackList = packs.cardPacks.map((el: CardPacksType) => <List key={el._id} remCallBack={remPack}
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
        dispatch(setMyCardsPacksTC(1, packs.pageCount, packs.sortPacks, user_id))
    }

    const onClickAllPacksHandler = () => {
        dispatch(setCardsPacksTC())
    }

    const addPack = () => {
        dispatch(setPackTC('add'));
    }

    console.log(status)
    if (status === 'loading') {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Preloader width={'300px'}/>
        </div>
    }

    return (
        <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
            <div className={s.div1}>
                <h4 className={s.packList}>Packs list</h4>
                <Button style={{marginTop: "20px"}} onClickCallBack={addPack} title={'Add new pack'}/>
            </div>
            <div className={s.div2}>
                <div>
                    <Debounce setValue={setValue} value={value}/>
                </div>
                <div>
                    <h4 className={s.h4}>Show packs cards</h4>
                    <Button onClickCallBack={onClickMyPacksHandler} title={'My'}/>
                    <Button onClickCallBack={onClickAllPacksHandler} title={'All'}/>
                </div>
                <div>
                    <h4 className={s.h4}>Number of cards</h4>
                    <RangeSlider/>
                </div>
            </div>
            <table className={s.table}>
                <thead className={s.blockOne}>
                <tr>
                    <td>Name</td>
                    <td>Cards</td>
                    <td>
                        <SortComponent
                            value={'updated'}
                            sort={packs.sortPacks}
                            title={'Last Updated'}
                            onChange={onChangeSort}
                        />
                    </td>
                    <td>Created by</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>{finalPackList}</tbody>
            </table>
            <PaginationComponent
                onChange={onChangePagination}
                totalCount={packs.cardPacksTotalCount}
                countOnPage={packs.pageCount}
                page={packs.page}
                count={packs.pageCount}/>
        </div>
    )
}


