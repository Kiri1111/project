import {CardPacksType, ResponsePackType} from "../../dal/api/authApi";
import {RootThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./app";
import {setIsInitialized} from "./auth";
import {packApi} from "../../dal/api/PackApi";
import {handleServerAppError} from "../../utils/errorUtil";

const initialState = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 1,
    pageCount: 10,
    searchValue: '',
    sortPacks: '0updated'
} as ResponsePackType

export const packList = (state: InitialStatePackListType = initialState, action: PackListActionsType) => {
    switch (action.type) {
        case 'PACK-LIST/SET-CARDS-PACKS':
            return {
                ...state,
                cardPacks: action.payload.data.cardPacks,
                cardPacksTotalCount: action.payload.data.cardPacksTotalCount,
                maxCardsCount: action.payload.data.maxCardsCount,
                minCardsCount: action.payload.data.minCardsCount,
                page: action.payload.data.page,
                pageCount: action.payload.data.pageCount
            }
        case 'PACK-LIST/SET-PACK':
            return {...state, cardPacks: [action.payload.pack, ...state.cardPacks]}
        case "PACK-LIST/SET-PAGE-COUNT-PACKS":
            return {...state, pageCount: action.payload.pageCount}
        case "PACK-LIST/SET-PAGE-NUMBER-PACKS":
            return {...state, page: action.payload.pageNumber}
        case "PACK-LIST/SET-SEARCH-VALUE":
            return {...state, searchValue: action.payload.searchValue}
        case "PACK-LIST/SET-SORT-PACKS":
            return {...state, sortPacks: action.payload.sortPacks}
        case "PACK-LIST/UPDATE-PACK":
            return {
                ...state, cardPacks: state.cardPacks.map(pack => {
                    return pack._id === action.payload.pack._id ? {...pack, name: action.payload.pack.name} : pack
                })
            }
        case "PACK-LIST/REMOVE-PACK":
            return {...state, cardPacks: state.cardPacks.filter(pack => pack._id !== action.payload.id)}
        case "PACK-LIST/MIN-MAX-PACK-QUANTITY":
            return {...state, minCardsCount: action.payload.min, maxCardsCount: action.payload.max}
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

export const setPackAC = (pack: CardPacksType) => ({
    type: 'PACK-LIST/SET-PACK',
    payload: {pack}
} as const)

export const setUpdatePackAC = (pack: CardPacksType) => ({
    type: 'PACK-LIST/UPDATE-PACK',
    payload: {pack}
} as const)

export const removePackAC = (id: string) => ({
    type: 'PACK-LIST/REMOVE-PACK',
    payload: {id}
} as const)

export const setMinMaxCardsQuantityAC = (min: number, max: number) => ({
    type: 'PACK-LIST/MIN-MAX-PACK-QUANTITY',
    payload: {min, max}
} as const)

//-------------thunks-----------------

export const resetCardsFilter = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await packApi.getPacks(1, 10, '', '', 0, 100000)
        if (res.status === 200) {
            dispatch(setCardsPacksAC(res.data))
        } else {
            dispatch(setAppError({error: 'Network Error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}

export const setCardsPacksTC = (): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus({status: 'loading'}))
    const {page, pageCount, searchValue, sortPacks, minCardsCount, maxCardsCount} = getState().packList
    try {
        const res = await packApi.getPacks(page, pageCount, sortPacks, searchValue, minCardsCount, maxCardsCount)
        if (res.status === 200) {
            dispatch(setCardsPacksAC(res.data))
        } else {
            dispatch(setAppError({error: 'Network Error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
        dispatch(setIsInitialized({isInitialized: false}))
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}

export const setMyCardsPacksTC = (): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus({status: 'loading'}))
    const {page, pageCount, sortPacks} = getState().packList
    const user_id = getState().profile._id
    try {
        const res = await packApi.getMyPacks(page, pageCount, sortPacks, user_id)
        if (res.status === 200) {
            dispatch(setCardsPacksAC(res.data))
        } else {
            dispatch(setAppError({error: 'Network Error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}

export const setPackTC = (text: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await packApi.addPack(text);
        if (response.statusText === 'Created') {
            dispatch(setCardsPacksTC())
        } else {
            dispatch(setAppError({error: 'Network Error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}

export const setMyPackTC = (text: string): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await packApi.addPack(text);
        if (response.statusText === 'Created') {
            dispatch(setMyCardsPacksTC())
        } else {
            dispatch(setAppError({error: 'Network Error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}

export const updatePackTC = (_id: string, name: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await packApi.updatePack(_id, name);
        if (response.status === 200) {
            dispatch(setUpdatePackAC(response.data.updatedCardsPack))
        } else {
            dispatch(setAppError({error: 'Network Error'}));
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
}

export const removePackTC = (_id: string): RootThunkType => async (dispatch, getState) => {
    dispatch(setAppStatus({status: 'loading'}))
    const myOrAllCards = getState().app.myOrAllCards
    try {
        if (myOrAllCards === 'all') {
            const response = await packApi.removePack(_id);
            if (response.status === 200) {
                dispatch(setCardsPacksTC())
            } else {
                dispatch(setAppError({error: 'Network Error'}))
            }
        } else {
            const response = await packApi.removePack(_id);
            if (response.status === 200) {
                dispatch(setMyCardsPacksTC())
            } else {
                dispatch(setAppError({error: 'Network Error'}))
            }
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
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
    | ReturnType<typeof setPackAC>
    | ReturnType<typeof setUpdatePackAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof setMinMaxCardsQuantityAC>
