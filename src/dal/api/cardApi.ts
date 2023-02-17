import { type } from 'os';
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
    min?: number
    max?: number
    cardAnswer?: string
    cardQuestion?: string
    page?: number
    pageCount?: number
}

type ResponseAddCardType = {
    newCard: CardType
}

type UpdateCardType = {
    updatedCard: CardType
}

type RmoveCardType = {
    deletedCard: CardType
}

export const cardApi = {
    getCards(cardRequest: RequestFetchCard) {
        return instance.get<ResponseCardType>(`cards/card?cardsPack_id=${cardRequest.cardsPack_id}`)
    },
    addCard(id: string, question: string) {
        return instance.post<ResponseAddCardType>('cards/card', {
            params: {
                card: {
                    cardsPack_id: id,
                    question: question
                }
            }
        })
    },
    updateCard(id: string, question: string) {
        return instance.put<UpdateCardType>('cards/card', {
            params: {
                _id: id,
                question
            }
        });
    },
    removeCard(id: string) {
        return instance.delete<RmoveCardType>(`cards/card?id=${id}`);
    },
}