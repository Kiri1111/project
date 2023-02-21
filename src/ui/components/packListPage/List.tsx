import React, {FC, memo} from 'react';
import {CardPacksType} from "../../../dal/api/authApi";
import style from "./List.module.scss"
import update from "../../common/assets/images/update.png"
import del from "../../common/assets/images/delete.png"
import {useAppSelector} from "../../../hooks/redux";
import {Preloader} from "../../common/components/preloader/Preloader";

type ListPropsType = {
    list: CardPacksType
    callBack: (id: string, name: string) => void
    remCallBack: (id: string) => void
}

export const List: FC<ListPropsType> = memo(({remCallBack, list, callBack}) => {

    const status = useAppSelector(state => state.app.status)

    const updatePack = (id: string, name: string) => {
        callBack(id, name);
    }

    return (

        <tr>
            <td className={style.td}>
                {list.name}
            </td>
            <td className={style.td}>
                {list.cardsCount}
            </td>
            <td className={style.td}>
                {list.updated.slice(0, 10)}
            </td>
            <td className={style.td}>
                {list.user_name}
            </td>

            <td className={style.td}>
                {
                    status === 'loading'
                        ? <Preloader width={'15px'}/>
                        : <div className={style.icons}>
                            <div onClick={() => {
                                updatePack(list._id, 'Hello my friend')
                            }}>
                                <img style={{width: '15px'}} src={update} alt={'update'}/>
                            </div>
                            <div onClick={() => {
                                remCallBack(list._id)
                            }}>
                                <img src={del} alt={'delete'} style={{width: '15px'}}/>
                            </div>
                        </div>
                }

            </td>
        </tr>
    );
})

