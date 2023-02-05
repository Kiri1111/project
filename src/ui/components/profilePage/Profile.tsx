import React from 'react';
import style from './Profile.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";

export const Profile = () => {

    const user = useAppSelector(state => state.profile)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
//    const dispatch = useAppDispatch()

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={style.profileBlock}>
            <h1>Personal Information</h1>
            <div>AVATAR</div>
            <div>Name: {user.name}</div>
            <div> {user.email}</div>
            <button>Log out</button>
        </div>
    );
};

