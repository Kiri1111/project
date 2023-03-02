import React, {useEffect, useState} from 'react';
import style from "./learnPage.module.css";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {getUserPacksTC} from "../../../bll/reducers/cards";
import Button from "../../common/components/commonButton/Button";
import {Debounce} from "../packListPage/Debounce";
import {Rate} from 'antd';

const LearnPage = () => {
    const params = useParams();
    const id = params.id
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.userPackList.cards)

    useEffect(() => {
        dispatch(getUserPacksTC(id))
    }, [])
    const [value, setValue] = useState<string>('')

    console.log(cards)

    return (
        <div className={style.container}>
            <div className={style.headBlock}>
                <h4>My Packs</h4>
                <Button title={'Add new card'} onClickCallBack={()=>{}}/>
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
                </tr>
                </thead>
                <tbody>
                {cards.map((el, i) => (<tr key={i}>
                    <td className={style.td}>{el.question}</td>
                    <td className={style.td}>{el.answer}</td>
                    <td className={style.td}>{el.updated ? el.updated.slice(0, 10) : ''}</td>
                   {/* <td>{el.grade}</td>*/}
                    <td className={style.td}>
                        <Rate allowHalf defaultValue={el.grade} />
                    </td>

                </tr>))}
                </tbody>
            </table>
        </div>
    );
};

export default LearnPage;
