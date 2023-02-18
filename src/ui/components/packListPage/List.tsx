import React, {FC, memo} from 'react';
import {CardPacksType} from "../../../dal/api/authApi";
import Button from '../../common/components/commonButton/Button';
import style from "./List.module.scss"


type ListPropsType = {
    list: CardPacksType
    callBack: (id: string, name: string) => void
    remCallBack: (id: string) => void
}

export const List: FC<ListPropsType> = memo(({remCallBack, list, callBack}) => {

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
                Elon Musk
            </td>

            <td className={style.td}>
                <Button onClickCallBack={() => {
                    updatePack(list._id, 'Hello my friend')
                }} title={'update'}/>
                <Button onClickCallBack={() => {
                    remCallBack(list._id)
                }} title={'delete'}/>
            </td>
        </tr>
    );
})

