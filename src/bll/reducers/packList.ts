import {authApi, ResponsePackType} from "../../dal/api/authApi";
import {RootThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./app";
import {setIsInitialized} from "./auth";
import {packApi} from "../../dal/api/PackApi";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    searchValue: ' ',
    sortPacks: '0updated'
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
        case "PACK-LIST/SET-PAGE-COUNT-PACKS":
            return {...state, pageCount: action.payload.pageCount}
        case "PACK-LIST/SET-PAGE-NUMBER-PACKS":
            return {...state, page: action.payload.pageNumber}
        case "PACK-LIST/SET-SEARCH-VALUE":
            return {...state, searchValue: action.payload.searchValue}
        case "PACK-LIST/SET-SORT-PACKS":
            return {...state, sortPacks: action.payload.sortPacks}
        default:
            return state
    }
}

//------------action creators-----------

export const setCardsPacksAC = (data: ResponsePackType) => ({
    type: 'PACK-LIST/SET-CARDS-PACKS',
    payload: {data}
} as const)

export const setPageCountAC = (pageCount: number) => ({
    type: 'PACK-LIST/SET-PAGE-COUNT-PACKS',
    payload: {pageCount}
} as const)

export const setPageNumberAC = (pageNumber: number) => ({
    type: 'PACK-LIST/SET-PAGE-NUMBER-PACKS',
    payload: {pageNumber}
} as const)

export const setSearchValueAC = (searchValue: string) => ({
    type: 'PACK-LIST/SET-SEARCH-VALUE',
    payload: {searchValue}
} as const)

export const setSortPacksAC = (sortPacks: string) => ({
    type: 'PACK-LIST/SET-SORT-PACKS',
    payload: {sortPacks}
} as const)

//-------------thunks-----------------

export const setCardsPacksTC = (): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus('loading'))
    const {page, pageCount, searchValue, sortPacks} = getState().packList
    try {
        const res = await cardsApi.getPacks(page, pageCount, sortPacks, searchValue)
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
        dispatch(setIsInitialized(false))
    } finally {
        dispatch(setAppStatus('idle'))

    }
}

export const setMyCardsPacksTC = (page: number, pageCount: number, sortPacks?: string, user_id?: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await cardsApi.getPacks(page, pageCount, sortPacks)
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

export const setPackTC = (text: string): RootThunkType => async (dispatch) => {
    try {
        const response = await packApi.addPack();
        console.log(response);
        console.log("add new pack " + text);
    } catch (e: any) {
        console.log(e);
    }
}

//-------------types----------

type InitialStatePackListType = typeof initialState

export type PackListActionsType =
    ReturnType<typeof setCardsPacksAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setPageNumberAC>
    | ReturnType<typeof setSearchValueAC>
    | ReturnType<typeof setSortPacksAC>
