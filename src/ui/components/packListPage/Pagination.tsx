import React, {FC, useMemo} from 'react';
import Pagination from '@mui/material/Pagination'
import {Select} from "../../common/components/commonSelect/Select";
import s from './Packlist.module.css'

type PaginationPropsType = {
    onChange: (page: number, count: number) => void
    totalCount: number
    countOnPage: number
    page: number
    count: number
}

export const PaginationComponent: FC<PaginationPropsType> = ({count, onChange, totalCount, countOnPage, page}) => {

    const lastPage = useMemo(() => Math.ceil(totalCount / countOnPage), [countOnPage])

    const onChangePaginationCallBack = (event: any, page: number) => {
        onChange(page, count)
    }

    const onChangeSelect = (newCountFromSelect: number) => {
        onChange(page, newCountFromSelect)

    }
    return (
        <div className={s.divPaginationContainer} >
            <Pagination
                color={'primary'}
                shape={'rounded'}
                page={page}
                count={lastPage}
                onChange={onChangePaginationCallBack}
            />
            <div className={s.divPagination}>
            <span>
                Show
            </span>
            <Select
                value={countOnPage}
                options={[
                    {id: 4, value: 4},
                    {id: 7, value: 7},
                    {id: 10, value: 10},
                ]}
                onChangeOption={onChangeSelect}
            />
            <span>
                Cards per Page
            </span>
            </div>
                </div>
    );
};

