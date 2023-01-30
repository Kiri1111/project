import React from 'react';
import {NavBar} from "./navBar/NavBar";
import style from 'Header.module.scss'

export const Header = () => {
    return (
        <div className={style.headerBlock}>
            <NavBar/>
        </div>
    );
};

