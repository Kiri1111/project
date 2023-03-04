import React, {FC,} from 'react';
import {CardPacksType} from "../../../dal/api/authApi";
import style from "./List.module.scss"
import update from "../../common/assets/images/update.png"
import del from "../../common/assets/images/delete.png"
import {useAppSelector} from "../../../hooks/redux";
import {Preloader} from "../../common/components/preloader/Preloader";
import noImage from "../../common/assets/images/noImageAavailable.svg.png";

type ListPropsType = {
    list: CardPacksType
    deleteHandler: (list: CardPacksType) => void
    updateHandler: (list: CardPacksType) => void
}

export const List: FC<ListPropsType> = ({
                                            updateHandler,
                                            list,
                                            deleteHandler
                                        }) => {

    const status = useAppSelector(state => state.app.status)

    const label = list.deckCover == null ? noImage : list.deckCover

    return (<>

            <tr>
                <td className={style.td}>

                    <img
                        style={{width: '30px', height: '30px', paddingRight: '20px'}}
                        alt={'icon label'}
                        src={label}
                    />
                    {list.name.slice(0, 12)}
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
                                <div onClick={() => updateHandler(list)}>
                                    <img style={{width: '15px'}} src={update} alt={'update'}/>
                                </div>
                                <div onClick={() => deleteHandler(list)}>
                                    <img src={del} alt={'delete'} style={{width: '15px'}}/>
                                </div>
                            </div>
                    }
                </td>
            </tr>
        </>
    );
}

