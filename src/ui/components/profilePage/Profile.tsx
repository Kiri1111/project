import React from 'react';
import style from './Profile.module.scss'
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";
import Button from "../../common/components/commonButton/Button";
import {logOutTC} from "../../../bll/reducers/auth";

export const Profile = () => {

    const user = useAppSelector(state => state.profile)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logOutHandler = () => dispatch(logOutTC())

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={style.profileBlock}>
            <h1>Personal Information</h1>
            <div>AVATAR</div>
            <div>Name: {user.name}</div>
            <div> {user.email}</div>
            <Button title={'Log out'} onClickCallBack={logOutHandler}/>
        </div>
    );
};

