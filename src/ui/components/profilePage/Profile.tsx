import React from "react";
import style from "./Profile.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";
import Button from "../../common/components/commonButton/Button";
import {logOutTC} from "../../../bll/reducers/auth";
import userPhoto from "../../common/assets/images/userPhoto.png"
import photoIcon from "../../common/assets/images/photoIcon.png"
import editName from "../../common/assets/images/editName.png"

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
            <h1>Personal Informatioon</h1>
            <img alt={'img avatar'} className={style.userPhoto}
                 src={user.avatar !== undefined ? user.avatar : userPhoto}/>
            <img alt={'img photo'} className={style.photoIcon}
                 src={photoIcon}/>
            <div className={style.nameText}>
                Name: {user.name}
                <img alt={'change name'} src={editName} className={style.changeNameIcon}/>
            </div>
            <div className={style.emailText}> {user.email}</div>
            <Button title={'Log out'} onClickCallBack={logOutHandler}/>
        </div>
    );
};

