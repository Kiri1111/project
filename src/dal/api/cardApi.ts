import {instance} from './authApi';


export type CardType = {
    _id: string
    cardsPack_id?: string | undefined
    user_id?: string
    answer?: string
    question?: string
    grade?: number
    shots?: number
    created?: string
    updated?: string
    type?: string
    rating?: number
    /*more_id?: string*/
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
export type CardPostType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}
/*export type CardUpdateType = {
    _id: string,
    question: string
}*/

export const cardApi = {
    getCards(id: string | undefined) {
        return instance.get<ResponseCardType>(`cards/card?cardsPack_id=${id}`)
    },
    addCard(card: CardPostType) {
        return instance.post('cards/card', {
            card
        })
    },
    updateCard(card: CardType) {
        return instance.put('cards/card', {
            card
        });
    },
    removeCard(id: string) {
        return instance.delete(`cards/card?id=${id}`);
    },
    gradeCard(card: {card_id:string, grade: number}) {
        return instance.put('cards/grade', card)
    }
}

