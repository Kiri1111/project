import {RootThunkType} from "../store/store";
import {setAppStatus} from "./app";
import {cardsApi} from "../../dal/api/CardsApi";

const initialState = {
    isLoggedIn: true,
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
    } catch (e: any) {

    }
}
///////Types
export type authActionsType = ReturnType<typeof setIsInitialized> | ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState
