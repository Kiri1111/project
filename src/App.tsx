import React, {useEffect} from 'react';
import style from './App.module.scss'
import {Demo} from "./ui/components/demoPage/Demo";
import {Header} from "./ui/components/header/header";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "./ui/components/loginPage/Login";
import {NewPassword} from "./ui/components/newPasswordPage/NewPassword";
import {RecoveryPassword} from "./ui/components/passwordRecoveryPage/RecoveryPassword";
import {Profile} from "./ui/components/profilePage/Profile";
import {Registration} from "./ui/components/registerPage/Registration";
import {ErrorNotFound} from "./ui/components/errorNotFoundPage/ErrorNotFound";
import {useAppDispatch} from "./hooks/redux";
import {initializeAppTC} from "./bll/reducers/auth";

export const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])
    
    return (
        <div className={style.app}>
            <Header/>
            <Routes>
                <Route path={'/project'} element={<Demo/>}/>
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'/404'} element={<ErrorNotFound/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/newPassword'} element={<NewPassword/>}/>
                <Route path={'/recoveryPassword'} element={<RecoveryPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
            </Routes>
        </div>
    );
}

//@ts-ignore
// window.store=store