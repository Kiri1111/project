import React, {useCallback} from "react";
import style from "./Profile.module.scss";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Navigate} from "react-router-dom";
import Button from "../../common/components/commonButton/Button";
import {logOutTC} from "../../../bll/reducers/auth";
import userPhoto from "../../common/assets/images/userPhoto.png"
import {EditName} from "./EditName";
import {setNewNameTC} from "../../../bll/reducers/profile";
import {ChangeAvatar} from "./ChangeAvatar";
import {Preloader} from "../../common/components/preloader/Preloader";


export const Profile = () => {

    const user = useAppSelector(state => state.profile)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const error = useAppSelector(state => state.app.error)
    const status = useAppSelector(state => state.app.status)
    const dispatch = useAppDispatch()

    const logOutHandler = () => dispatch(logOutTC())


    const setNewNameHandler = useCallback((newName: string) => {
        dispatch(setNewNameTC(newName))
    }, [user.name])

    const photo = user.avatar == null ? userPhoto : user.avatar

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
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
                        <ChangeAvatar/>
                        <div className={style.cardsCounts}>
                            Number of cards: {user.publicCardPacksCount}
                        </div>
                        {error && <span style={{color: 'red', fontSize: '15px'}}>{error}</span>}
                        <EditName callBack={setNewNameHandler} userName={user.name}/>
                        <div className={style.emailText}>
                            Email: {user.email}
                        </div>
                        <Button xType={'secondary'} title={'Log out'} onClickCallBack={logOutHandler}/>
                    </>
            }


        </div>
    );
};
