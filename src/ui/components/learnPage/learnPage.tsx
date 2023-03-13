import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {CardType} from "../../../dal/api/cardApi";
import s from "./learnPage.module.css"
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import Button from "../../common/components/commonButton/Button";
import {getUserPacksTC, gradeCardTC} from "../../../bll/reducers/cards";


const grades = ['Did not know', 'Forgot', 'A lot of thought', 'Confused', 'Knew the answer'];

const getCard = (cards: CardType[]) => {
    // @ts-ignore
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
            // @ts-ignore
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const params = useParams();
    const id = params.id
    const dispatch = useAppDispatch()
    const cards = useAppSelector(state => state.userPackList.cards)
    const cardPacks = useAppSelector(state => state.packList.cardPacks)
    const [nextPage, setNextPage] = useState<boolean>(false)
    const [firstQuestion, setFirst] = useState<boolean>(true);
    const [card, setCard] = useState<CardType>({
        _id: '',
        cardsPack_id: '',
        answer: 'answer fake',
        question: 'question fake',
        grade: 0,
        shots: 0,
        type: '',
        rating: 0,
        user_id: '',
        created: '',
        updated: '',
    });
    useEffect(() => {
        if (firstQuestion) {
            dispatch(getUserPacksTC(id))
            setFirst(false)
        }
        if (cards.length > 0) setCard(getCard(cards));
    }, [dispatch, id, cards, firstQuestion])

    const nextHandler = () => {
        setFirst(true)
        setNextPage(false)

    }
    return (
        <div className={s.learnPage}>
            {!nextPage &&
                <>
                    <div className={s.questionContainer}>
                        {cardPacks.map((el) => el._id === id ? <span>Learn  "{el.name}"</span> : "")}
                    </div>
                    <div className={s.questionBlock}>
                        <div className={s.questionText}><span>Question</span> : {card.question}
                        </div>
                        <Button onClickCallBack={() => setNextPage(true)} title={"Show answer"}/>
                    </div>
                </>
            }
            {
                nextPage &&
                <>
                    <div className={s.questionContainer}>
                        {cardPacks.map((el) => el._id === id ? <span>Learn  "{el.name}"</span> : "")}
                    </div>
                    <div className={s.questionBlock}>
                        <div className={s.questionText}><span>Question</span> : {card.question}
                        </div>
                        <div className={s.questionText}>
                            <span>Answer </span> : {card.answer}
                        </div>
                        <div>
                            {grades.map((el, index) => <li
                                onClick={() => {
                                dispatch(gradeCardTC({card_id : card._id, grade: index+1}))
                            }}>{el}</li>)}
                        </div>
                        <Button onClickCallBack={nextHandler} title={'Next'}/>
                    </div>
                </>
            }
        </div>
    );
};

export default LearnPage;
