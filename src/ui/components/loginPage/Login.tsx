import React from 'react';
import style from './Login.module.scss'
import {Navigate} from "react-router-dom";
import {useAppSelector} from "../../../hooks/redux";

export const Login = () => {

    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    if (isLoggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={style.loginBlock}>
            <h1>Login page</h1>
        </div>
    );
};

