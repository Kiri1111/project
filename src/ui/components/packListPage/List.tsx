import React, {FC, memo} from 'react';
import {CardPacksType} from "../../../dal/api/authApi";
import Button from '../../common/components/commonButton/Button';

type ListPropsType = {
    list: CardPacksType
    callBack: (id: string, name: string) => void
    remCallBack:(id:string)=>void
}

export const List: FC<ListPropsType> = memo(({remCallBack,list, callBack}) => {

    const updatePack = (id: string, name: string) => {
        callBack(id, name);
    }

    return (
        <tr>
            <td>
                {list.name}
            </td>
            <td>
                {list.cardsCount}
            </td>
            <td>
                {list.updated.slice(0, 10)}
            </td>
            <td>
                <Button onClickCallBack={() => {updatePack(list._id, 'Hello my friend')}} title={'update'}/>
                <Button onClickCallBack={() => {remCallBack(list._id)}} title={'delete'}/>
            </td>
        </tr>
    );
})

