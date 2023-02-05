import React from 'react';
import style from './Profile.module.scss'
import {useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";

export const Profile = () => {
    const user = useAppSelector(state => state.profile)
    const isLoggedIn = useAppSelector(state => state.auth)
    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={style.profileBlock}>
            <h1>My profile</h1>
            <div>Name:{user.name}</div>
            <div>ageeee:{user.age}</div>
        </div>
    );
};

