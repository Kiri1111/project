import React, {ChangeEvent, useCallback} from "react";
import style from "./Profile.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";
import Button from "../../common/components/commonButton/Button";
import {logOutTC} from "../../../bll/reducers/auth";
import userPhoto from "../../common/assets/images/userPhoto.png"
import photoIcon from "../../common/assets/images/photoIcon.png"
import {EditName} from "./EditName";
import {setNewAvatarTC, setNewNameTC} from "../../../bll/reducers/profile";


export const Profile = () => {

    const user = useAppSelector(state => state.profile)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useAppDispatch()

    const logOutHandler = () => dispatch(logOutTC())

    const setNewNameHandler = useCallback((newName: string) => {
        dispatch(setNewNameTC(newName))
    }, [user.name])

    const setNewAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setNewAvatarTC(e.currentTarget.value))
    }

    const photo = user.avatar == null ? userPhoto : user.avatar

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }
    return (
        <div className={style.profileBlock}>
            <input type={"file"} onChange={setNewAvatarHandler}/>
            <h1>Personal Information</h1>
            <img alt={'img avatar'} className={style.userPhoto}
                 src={photo}/>
            <img alt={'change avatar'} className={style.photoIcon}
                 src={photoIcon}/>
            <EditName callBack={setNewNameHandler} userName={user.name}/>
            <div className={style.emailText}> {user.email}</div>
            <Button xType={'secondary'} title={'Log out'} onClickCallBack={logOutHandler}/>
        </div>
    );
};
