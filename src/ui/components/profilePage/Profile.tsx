import React from 'react';
import style from './Profile.module.scss'
import {useAppSelector} from "../../../hooks/redux";

export const Profile = () => {
    const user = useAppSelector(state => state.profile)
    return (
        <div className={style.profileBlock}>
            <h1>My profile</h1>
            <div>Name:{user.name}</div>
            <div>Age:{user.age}</div>
        </div>
    );
};

