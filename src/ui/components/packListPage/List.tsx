import React, {FC, memo} from 'react';
import {CardPacksType} from "../../../dal/api/CardsApi";
import s from './Packlist.module.css'

type ListPropsType = {
    list: CardPacksType
}

export const List: FC<ListPropsType> = memo(({list}) => {
    return (
        <tr>
            <td className={s.blockTwo}>
                {list.name}
            </td>
            <td className={s.blockTwo}>
                {list.cardsCount}
            </td>
            <td className={s.blockTwo}>
                {list.updated.slice(0, 10)}
            </td>
        </tr>
    );
})

