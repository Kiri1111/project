import React, {useEffect, useState} from 'react';
import {setCardsPacksTC} from "../../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Preloader} from "../../common/components/preloader/Preloader";
import {CardPacksType} from "../../../dal/api/CardsApi";
import {List} from "./List";
import {PaginationComponent} from "./Pagination";
import {SortComponent} from "./SortComponent";
import { setPackTC } from '../../../bll/reducers/packList';

export const PackList = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packList)

    const [count, setCount] = useState(10)
    const [sort, setSort] = useState('0updated')
    console.log(sort)
    useEffect(() => {
        dispatch(setCardsPacksTC(1, count))
    }, [])

    const finalPackList = packs.cardPacks.map((el: CardPacksType) => <List key={el._id} list={el}/>)

    const onChangePagination = (newPage: number, newCount: number) => {
        setCount(newCount)
        dispatch(setCardsPacksTC(newPage, newCount, sort))
    }

    const onChangeSort = (newSort?: string) => {
        if (newSort) {
            setSort(newSort)
            dispatch(setCardsPacksTC(1, count, newSort))
        }
    }

    const addPack = () => {
        dispatch(setPackTC('ok'));
        console.log("tset");
    }

    if (status === 'loading') {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Preloader width={'300px'}/>
        </div>
    }

    return (
        <div>
            <h3>Pack list</h3>
            <button onClick={addPack}>Add</button>
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Cards</td>
                    <td>
                        <SortComponent
                            value={'updated'}
                            sort={sort}
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
                count={count}/>
        </div>
    )
}

