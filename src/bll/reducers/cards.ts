import {RootThunkType} from "../store/store";
import {cardApi, ResponseCardType} from "../../dal/api/cardApi";
import {setAppStatus} from "./app";
import {handleServerAppError} from "../../utils/errorUtil";

const initialState = {
    cards: [],
    packUserId: "",
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 4
} as ResponseCardType

export const userPackList = (state: InitialStatePackListType = initialState, action: CardsListActionsType) => {
    switch (action.type) {
        case "GET-USER-PACKS":
            return {
                ...state,
                cards:action.cards.cards,
                packUserId:action.cards.packUserId,
                page:action.cards.page,
                pageCount:action.cards.pageCount,
                cardsTotalCount:action.cards.cardsTotalCount,
                maxGrade:action.cards.maxGrade,
                minGrade:action.cards.minGrade
            }
        default:
            return state
    }
}

export const getUserPacksAC = (cards: ResponseCardType) => {
    return {
        type: "GET-USER-PACKS",
        cards
    }
}

export const getUserPacksTC = (userId: string | undefined): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await cardApi.getCards(userId)
        if (res.status === 200) {
            dispatch(getUserPacksAC(res.data))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}


//-----types----
type InitialStatePackListType = typeof initialState

export type CardsListActionsType =
    ReturnType<typeof getUserPacksAC>

