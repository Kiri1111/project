import {cardsApi, ResponsePackType} from "../../dal/api/CardsApi";
import {RootThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./app";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0,
    pageCount: 0,
} as ResponsePackType

export const packList = (state: InitialStatePackListType = initialState, action: PackListActionsType) => {
    switch (action.type) {
        case'PACK-LIST/SET-CARDS-PACKS':
            return {
                ...state,
                cardPacks: action.payload.data.cardPacks,
                cardPacksTotalCount: action.payload.data.cardPacksTotalCount,
                maxCardsCount: action.payload.data.maxCardsCount,
                minCardsCount: action.payload.data.minCardsCount,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount,
            }
        default:
            return state
    }
}

//------------action creators-----------

export const setCardsPacksAC = (data: ResponsePackType) => ({
    type: 'PACK-LIST/SET-CARDS-PACKS',
    payload: {data}
} as const)

//-------------thunks-----------------

export const setCardsPacksTC = (page: number, pageCount: number): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await cardsApi.getPacks(page, pageCount)
        console.log(res)
        if (res.status === 200) {
            dispatch(setCardsPacksAC(res.data))
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

//-------------types----------

type InitialStatePackListType = typeof initialState

export type PackListActionsType = ReturnType<typeof setCardsPacksAC>