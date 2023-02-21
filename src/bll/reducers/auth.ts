import {RootThunkType} from "../store/store";
import {setAppError, setAppStatus} from "./app";
import {authApi, LoginRequestType} from "../../dal/api/authApi";
import {deleteUserAC, setNewAvatarAC, setUserAC} from "./profile";
import {handleServerAppError} from "../../utils/errorUtil";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}


export const auth = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
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
    setAppStatus('loading')
    try {
        const res = await authApi.me()
        dispatch(setIsLoggedInAC(true))
        dispatch(setUserAC(res.data))
        dispatch(setNewAvatarAC(res.data.avatar))
        dispatch(setIsInitialized(true))

    } catch (e: any) {
        handleServerAppError(e, dispatch)
        dispatch(setIsLoggedInAC(false))

    } finally {
        dispatch(setIsInitialized(true))
        setAppStatus('succeeded')
    }
}

export const registerTC = (email: string, password: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const response = await authApi.register(email, password);
        dispatch(loginTC({email, password}))
        if (response.statusText === 'Created') {
            dispatch(setIsLoggedInAC(true));
        }
        dispatch(setAppStatus('succeeded'));
    } catch (e: any) {
        handleServerAppError(e, dispatch)
        dispatch(setAppStatus('failed'));
        dispatch(setIsLoggedInAC(false))
    }
}

export const loginTC = (data: LoginRequestType): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authApi.login(data)
        if (res.status === 200) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setUserAC(res.data))
            dispatch(setAppError(null))
            dispatch(setAppStatus('succeeded'))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}


export const logOutTC = (): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authApi.logOut()
        dispatch(setIsLoggedInAC(false))
        dispatch(setIsLoggedInAC(false))
        dispatch(deleteUserAC())
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus('idle'))
    }
}
//Types
export type AuthActionsType =
    ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setIsLoggedInAC>


type InitialStateType = typeof initialState
