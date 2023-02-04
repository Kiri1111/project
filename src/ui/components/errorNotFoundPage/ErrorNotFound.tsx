import React from 'react';
import style from './ErrorNotFound.module.scss'
import error404 from '../../common/assets/images/error404.webp'

export const ErrorNotFound = () => {

    const errorBackground = {
        backgroundImage: `url(${error404})`
    }

    return (
        <div className={style.errorNotFoundBlock} style={errorBackground}>
        </div>
    );
};

