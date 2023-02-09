import React from 'react';
import style from './Login.module.scss'
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";

export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const error = useAppSelector(state => state.app.error)

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={style.loginBlock}>
            <h1>Login page</h1>
            <div style={{color: 'red'}}>{error}</div>
        </div>
    );
};

