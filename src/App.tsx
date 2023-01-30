import React from 'react';
import style from './App.module.scss'
import {Demo} from "./s3-ui/u2-components/demoPage/Demo";
import {Header} from "./s3-ui/u2-components/header/header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./s3-ui/u2-components/loginPage/Login";
import {NewPassword} from "./s3-ui/u2-components/newPasswordPage/NewPassword";
import {RecoveryPassword} from "./s3-ui/u2-components/passwordRecoveryPage/RecoveryPassword";
import {Profile} from "./s3-ui/u2-components/profilePage/Profile";
import {Registration} from "./s3-ui/u2-components/registerPage/Registration";
import {ErrorNotFound} from "./s3-ui/u2-components/errorNotFoundPage/ErrorNotFound";

export const App = () => {
    return (
        <div className={style.app}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Demo/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'/404'} element={<ErrorNotFound/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/newPassword'} element={<NewPassword/>}/>
                <Route path={'/recoveryPassword'} element={<RecoveryPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
            </Routes>
        </div>
    );
}

//@ts-ignore
// window.store=store