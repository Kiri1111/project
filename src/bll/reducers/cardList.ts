import { RootThunkType } from "../store/store";
import { ResponseCardType, CardType, cardApi } from "../../dal/api/cardApi";
import {setAppError, setAppStatus} from "./app";

const initialState = {
    cards: [],
    packUserId: '',
    page: 1,
    pageCount: 5,
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
} as ResponseCardType;


export const cardList = (state: InitialStateCardListType = initialState, action: CardListActionsType): ResponseCardType => {
    switch (action.type) {
        case 'CARD-LIST/FETCH-CARDS':
            return {
                ...state,
                cards: action.payload.cards.cards,
                packUserId: action.payload.cards.packUserId,
                page: action.payload.cards.page,
                pageCount: action.payload.cards.pageCount,
                cardsTotalCount: action.payload.cards.cardsTotalCount,
                maxGrade: action.payload.cards.maxGrade,
                minGrade: action.payload.cards.minGrade,
            }
        case 'CARD-LIST/ADD-CARD':
            return {...state, cards: [action.payload.card, ...state.cards]}
        case 'CARD-LIST/UPDATE-CARD':
            return {...state, cards: state.cards.map(card => {
                return card._id === action.payload.card._id ? {...card, question: action.payload.card.question} : card
            })}
        case 'CARD-LIST/REMOVE-CARD':
            return {...state, cards: state.cards.filter(card => card._id !== action.payload.id)}
        default:
            return state
    }
}


export const setCardsTC = (cardsPack_id: string): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus('loading'))
    try {
        const response = await cardApi.getCards({cardsPack_id});
        if(response.status === 200) {
            dispatch(setAppStatus('succeeded'))
            dispatch(fetchCardsAC(response.data))
        } else {
            dispatch(setAppError('Network Error'))
        }
        
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    } finally {
        dispatch(setAppStatus('idle'))
    }
}

export const addCardTC = (id: string, question: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const response = await cardApi.addCard(id, question);
        if (response.statusText === 'Created') {
            dispatch(setAppStatus('succeeded'))
            dispatch(addCardAC(response.data.newCard))
        } else {
            dispatch(setAppError('Network Error'))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    }
}

export const updateCardTC = (id: string, question: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const response = await cardApi.updateCard(id, question);
        if (response.status === 200) {
            dispatch(setAppStatus('succeeded'))
            dispatch(updateCardAC(response.data.updatedCard))
        } else {
            dispatch(setAppError('Network Error'))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    }
}

export const removeCardTC = (id: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const response = await cardApi.removeCard(id);
        if (response.status === 200) {
            dispatch(setAppStatus('succeeded'))
            dispatch(removeCardAC(response.data.deletedCard._id))
        } else {
            dispatch(setAppError('Network Error'))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    }
}

const fetchCardsAC = (cards: ResponseCardType) => ({ type: 'CARD-LIST/FETCH-CARDS', payload: { cards } } as const)
const addCardAC = (card: CardType) => ({ type: 'CARD-LIST/ADD-CARD', payload: { card } } as const)
const updateCardAC = (card: CardType) => ({ type: 'CARD-LIST/UPDATE-CARD', payload: { card } } as const)
const removeCardAC = (id: string) => ({ type: 'CARD-LIST/REMOVE-CARD', payload: { id } } as const)

type InitialStateCardListType = typeof initialState

export type CardListActionsType =
    ReturnType<typeof fetchCardsAC>
    | ReturnType<typeof addCardAC>
    | ReturnType<typeof updateCardAC>
    | ReturnType<typeof removeCardAC>