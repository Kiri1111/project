import {RootThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./app";
import {cardsApi} from "../../dal/api/CardsApi";
import {setNewAvatarAC, setUserAC} from "./profile";

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

    try {
        const res = await cardsApi.me()
        dispatch(setIsInitialized(true))
        dispatch(setUserAC(res.data))
        dispatch(setNewAvatarAC(res.data.avatar))
        dispatch(setIsLoggedInAC(true))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    } finally {
        dispatch(setIsInitialized(false))
    }
}

export const logOutTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    const res = await cardsApi.logOut()
    try {
        dispatch(setIsLoggedInAC(false))
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    } finally {
        dispatch(setAppStatus('succeeded'))
    }
}
///////Types
export type authActionsType = ReturnType<typeof setIsInitialized> | ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState
