import React, {useCallback} from "react";
import style from "./Profile.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate, NavLink} from "react-router-dom";
import Button from "../../common/components/commonButton/Button";
import {logOutTC} from "../../../bll/reducers/auth";
import userPhoto from "../../common/assets/images/userPhoto.png"
import {EditName} from "./EditName";
import {setNewAvatarTC, setNewNameTC} from "../../../bll/reducers/profile";
import {ChangeAvatar} from "../../common/components/changeImage/ChangeAvatar";
import {Preloader} from "../../common/components/preloader/Preloader";


export const Profile = () => {

    const user = useAppSelector(state => state.profile)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    const logOutHandler = () => dispatch(logOutTC())


    const setNewNameHandler = useCallback((newName: string) => {
        dispatch(setNewNameTC(newName))
    }, [user.name])

    const setNewAvatarHandler = useCallback((base64: string | ArrayBuffer | null) => {
        dispatch(setNewAvatarTC(base64))
    }, [user.name])


    const photo = user.avatar == null ? userPhoto : user.avatar

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <div className={style.profilePage}>
            <div className={style.linkPackList}>
                <NavLink className={style.link} to={'/packList'}>&#8656; Back to Pack list </NavLink>
            </div>
            <div className={style.profileBlock}>
                {
                    status === 'loading'
                        ? <Preloader width={'100px'}/>
                        : <>
                            <div>
                                Personal Information
                            </div>
                            <img
                                alt={'img avatar'} className={style.userPhoto}
                                src={photo}
                            />
                            <ChangeAvatar callBack={setNewAvatarHandler}/>
                            <div className={style.cardsCounts}>
                                Number of cards: {user.publicCardPacksCount}
                            </div>
                            <EditName callBack={setNewNameHandler} userName={user.name}/>
                            <div className={style.emailText}>
                                Email: {user.email}
                            </div>
                            <Button xType={'secondary'} title={'Log out'} onClickCallBack={logOutHandler}/>
                        </>
                }
            </div>
        </div>
    );
};
