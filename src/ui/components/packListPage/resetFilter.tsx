import React from 'react';
import iconResetFilter from '../../common/assets/images/resetFilter.png'

export const ResetFilter = () => {

    const onClickHandler = () => {
    }

    return (
        <div onClick={onClickHandler}>
            <img style={{width: '30px'}} src={iconResetFilter} alt={'reset filter'}/>
        </div>
    );
};

