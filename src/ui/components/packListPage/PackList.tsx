import React, {useEffect} from 'react';
import {setCardsPacksTC} from "../../../bll/reducers/packList";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Preloader} from "../../common/components/preloader/Preloader";
import {CardPacksType} from "../../../dal/api/CardsApi";
import {List} from "./List";
import {PaginationComponent} from "./Pagination";

export const PackList = () => {

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.app.status)
    const packs = useAppSelector(state => state.packList)

    useEffect(() => {
        dispatch(setCardsPacksTC(1, 4))
    }, [])

    const finalPackList = packs.cardPacks.map((el: CardPacksType) => <List key={el._id} list={el}/>)

    const onchangePagination = (newPage: number, newCount: number) => {

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
            <table>
                <thead>
                <tr>
                    <td>Name</td>
                    <td>Cards</td>
                    <td>Last Updated</td>
                    <td>Created by</td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody>{finalPackList}</tbody>
            </table>
            <PaginationComponent
                onChange={onchangePagination}
                totalCount={packs.cardPacksTotalCount}
                countOnPage={packs.pageCount}
                page={packs.page}
                count={10}/>
        </div>
    )
}

