import React from 'react';
import iconResetFilter from '../../common/assets/images/resetFilter.png'
import {useAppDispatch} from "../../../hooks/redux";
import {resetCardsFilter} from "../../../bll/reducers/packList";

export const ResetFilter = () => {

    const dispatch = useAppDispatch()

    const onClickHandler = () => {
        dispatch(resetCardsFilter())
    }

    return (
        <div onClick={onClickHandler}>
            <img style={{width: '30px', boxShadow: '5px 5px 30px lightgray'}} src={iconResetFilter}
                 alt={'reset filter'}/>
        </div>
    );
};

