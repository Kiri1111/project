import React from 'react';
import style from './NavBar.module.scss'
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <div className={style.navBarBlock}>
            <NavLink className={style.link} to={'/project'}>-Main-</NavLink>
            <NavLink className={style.link} to={'/login'}>-Login-</NavLink>
            <NavLink className={style.link} to={'/newPassword'}>-New Password-</NavLink>
            <NavLink className={style.link} to={'/recoveryPassword'}>-Recovery Password-</NavLink>
            <NavLink className={style.link} to={'/profile'}>-Profile-</NavLink>
            <NavLink className={style.link} to={'/registration'}>-Registration-</NavLink>
        </div>
    );
};

