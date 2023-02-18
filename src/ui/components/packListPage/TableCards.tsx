import React, {FC} from 'react';
import {Preloader} from "../../common/components/preloader/Preloader";
import {SortComponent} from "./SortComponent";
import {PaginationComponent} from "./Pagination";
import {RequestStatusType} from "../../../bll/reducers/app";
import style from "./TableCards.module.scss"

type TableCardsPropsType = {
    sortPacks: string
    status: RequestStatusType
    onChangeSort: (newSort?: string) => void
    onChangePagination: (newPage: number, newCount: number) => void
    finalPackList: any
    cardPacksTotalCount: number
    pageCount: number
    page: number
}

export const TableCards: FC<TableCardsPropsType> = ({
                                                        sortPacks,
                                                        status,
                                                        onChangeSort,
                                                        onChangePagination,
                                                        finalPackList,
                                                        cardPacksTotalCount,
                                                        pageCount,
                                                        page
                                                    }) => {
    return (
        <div className={style.tableContainer}>
            {
                status === 'loading'
                    ? <div>
                        <Preloader width={'300px'}/>
                    </div>
                    : <div>
                        <table className={style.table}>
                            <thead className={style.thead}>
                            <tr>
                                <td>Name</td>
                                <td>Cards</td>
                                <td>
                                    <SortComponent
                                        value={'updated'}
                                        sort={sortPacks}
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
                            totalCount={cardPacksTotalCount}
                            countOnPage={pageCount}
                            page={page}
                            count={pageCount}/>
                    </div>
            }
        </div>
    );
};

