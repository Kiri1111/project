import React from 'react';
import {NavBar} from "./navBar/NavBar";
import style from './Header.module.scss'
import {useAppSelector} from "../../../hooks/redux";
import userPhoto from "../../common/assets/images/userPhoto.png";
import {NavLink} from "react-router-dom";

export const Header = () => {
    const user = useAppSelector(state => state.profile)

    const photo = user.avatar == null ? userPhoto : user.avatar

    return (
        <div className={style.headerBlock}>

            <NavBar/>
            <span className={style.headerPhoto}>
                 <NavLink className={style.userName} to={'/profile'}>{user.name}</NavLink>
                <img alt={'img avatar'} className={style.imgAvatar}
                     src={photo}/>
            </span>
        </div>
    );
};

