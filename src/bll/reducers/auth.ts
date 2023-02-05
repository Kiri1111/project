import {RootThunkType} from "../store/store";
import {setAppStatus} from "./app";
import {cardsApi} from "../../dal/api/CardsApi";
import {setUserAC} from "./profile";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}


export const auth = (state: InitialStateType = initialState, action: authActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'AUTH/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}

////////action creators
export const setIsInitialized = (isInitialized: boolean) => ({
    type: 'AUTH/SET-INITIALIZED',
    payload: {isInitialized}
} as const)

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)

////////Thunks

export const initializeAppTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await cardsApi.me()
        dispatch(setUserAC(res.data))
        dispatch(setIsLoggedInAC(true))
    } catch (e: any) {

    } finally {
        dispatch(setAppStatus('succeeded'))
    }
}

export const logOutTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    const res = await cardsApi.logOut()
    try {
        dispatch(setIsLoggedInAC(false))
    } catch (e: any) {

    } finally {
        dispatch(setAppStatus('succeeded'))
    }
}
///////Types
export type authActionsType = ReturnType<typeof setIsInitialized> | ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState
