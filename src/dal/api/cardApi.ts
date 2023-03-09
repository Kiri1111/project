import {number} from 'yup';
import {instance} from './authApi';


export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer?: string
    question?: string
    grade?: number
    shots?: number
    created?: string
    updated?: string
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type ResponseCardType = {
    cards: Array<CardType>
    packUserId: string
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
}

type RequestAddType = Omit<CardType, '_id' | 'user_id' | 'created' | 'updated'>
type RequestFetchCard = {
    cardsPack_id: string
    cardAnswer: string
    cardQuestion: string
    min: number
    max: number
    sortCards: number
    page?: number
    pageCount?: number
}


export const cardApi = {
    getCards(cardRequest: RequestFetchCard) {
        return instance.get<ResponseCardType>(`cards/card?cardsPack_id=${cardRequest.cardsPack_id}`)
    },
    addCard(card: RequestAddType) {
        return instance.post('cards/card', {
            params: {
                card: card
            }
        })
    },
    updateCard(id: string, question: string) {
        return instance.put('cards/card', {
            params: {
                _id: id,
                question
            }
        });
    },
    updateQuestionImg(_id: string, questionImg: string) {
        return instance.put('cards/card', {
            params: {
                _id,
                questionImg
            }
        })
    },
    removeCard(id: string) {
        return instance.delete(`cards/card?id=${id}`);
    },
}