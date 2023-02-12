import React, {FC, memo} from 'react';
import {CardPacksType} from "../../../dal/api/CardsApi";

type ListPropsType = {
    list: CardPacksType
}

export const List: FC<ListPropsType> = memo(({list}) => {
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
        </tr>
    );
})

