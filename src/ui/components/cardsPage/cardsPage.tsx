import React, {useCallback, useEffect, useState} from 'react';
import style from "./cardsPage.module.css";
import {NavLink, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getUserPacksTC, removeCardTC} from "../../../bll/reducers/cards";
import Button from "../../common/components/commonButton/Button";
import {Debounce} from "../packListPage/Debounce";
import {Rate} from 'antd';
import AddEditCard from "../modalPages/cardModal/AddEditCard";
import {CardPacksType} from "../../../dal/api/authApi";
import trash from "../../common/assets/images/trash.png"
import pencil from "../../common/assets/images/pencil.png"
import {CardType} from "../../../dal/api/cardApi";

const CardsPage = () => {
    const params = useParams();
    const id = params.id
    const dispatch = useAppDispatch()
    const my_id = useAppSelector(state => state.profile._id);
    const cards = useAppSelector(state => state.userPackList.cards)
    const packUserId = useAppSelector(state => state.userPackList.packUserId)
    const cardPacks = useAppSelector(state => state.packList.cardPacks)


    useEffect(() => {
        dispatch(getUserPacksTC(id))
    }, [])

    const [value, setValue] = useState<string>('')

    const [openModalAddCard, setOpenModalAddCard] = useState(false);

    const closeModal = useCallback(() => setOpenModalAddCard(false), [])

    const addCard =()=> {
        setOpenModalAddCard(true)

    }
    const removeCard = useCallback((cardId: string) => {
        dispatch(removeCardTC(cardId))
        dispatch(getUserPacksTC(id))
    }, [])
    console.log(cards)

    return (
        <div className={style.container}>
            <div className={style.linkPackList}>
                <NavLink className={style.link} to={'/packList'}>&#8656; Back to Pack list </NavLink>
            </div>
            <div className={style.headBlock}>
                {cardPacks.map((el: CardPacksType) => el._id === id ? <h4>{el.name}</h4> : '')}
                {my_id === packUserId ? <Button title={'Add new card'} onClickCallBack={addCard}/> : <></>}
            </div>
            <div className={style.searchBlock}>
                <Debounce setValue={setValue} value={value}/>
                </div>
            <table className={style.table}>
                <thead className={style.tabslesBlock}>
                <tr>
                    <th>Question </th>
                    <th>Answer</th>
                    <th>Last Updated</th>
                    <th>grade</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {cards.map((el:CardType, i:number) => (<tr key={i}>
                    <td className={style.td}>{el.question}</td>
                    <td className={style.td}>{el.answer}</td>
                    <td className={style.td}>{el.updated ? el.updated.slice(0, 10) : ''}</td>
                   {/* <td>{el.grade}</td>*/}
                    <td className={style.td}>
                        <Rate allowHalf defaultValue={el.grade} />
                    </td>
                    <td className={style.td}>
                        <div className={style.icons} >
                        <div onClick={()=>removeCard(el._id)}>
                            <img src={trash} alt={"delete"} style={{width:"20px"}}/>
                        </div>
                        <div >
                            <img src={pencil} alt={"pencil"} style={{width:"20px"}} />
                        </div>
                        </div>
                    </td>

                </tr>))}
                </tbody>
            </table>
            <AddEditCard isVisible={openModalAddCard} close={closeModal} cardId={id} />
        </div>
    );
};

export default CardsPage;
