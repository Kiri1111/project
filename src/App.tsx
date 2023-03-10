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
import {useAppDispatch, useAppSelector} from "./hooks/redux";
import {initializeAppTC} from "./bll/reducers/auth";
import {Preloader} from "./ui/common/components/preloader/Preloader";
import {PackList} from "./ui/components/packListPage/PackList";
import {Footer} from "./ui/components/footer/Footer";
import {MyPacks} from "./ui/components/MyPacks";
import {ErrorSnackbar} from "./ui/common/components/errorSnackBar/ErrorSnackbar";
import {InputTypeFile} from "./ui/common/components/inputTypeFile/InputFile";


export const App = () => {
    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.auth.isInitialized)


    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <Preloader width={'300px'}/>
        </div>
    }

    return (
        <div className={style.app}>
            <Header/>
            <ErrorSnackbar/>
            <Routes>
                <Route path={'/project'} element={<Demo/>}/>
                <Route path={'/myPack'} element={<MyPacks/>}/>
                <Route path={'/packList'} element={<PackList/>}/>a
                <Route path={'/*'} element={<Navigate to={'/404'}/>}/>
                <Route path={'/404'} element={<ErrorNotFound/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/newPassword'} element={<NewPassword/>}/>
                <Route path={'/recoveryPassword'} element={<RecoveryPassword/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/registration'} element={<Registration/>}/>
            </Routes>

            <div>
                <Footer/>
            </div>
        </div>
    );
}

//@ts-ignore
// window.store=store
