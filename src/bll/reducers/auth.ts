import {setAppError, setAppStatus} from "./app";
import {authApi, LoginRequestType, RegistrationRequestType} from "../../dal/api/authApi";
import {deleteUserAC, setNewAvatarAC, setUserAC} from "./profile";
import {handleServerAppError} from "../../utils/errorUtil";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    isInitialized: false
}
export const logOutTC = createAsyncThunk('auth/logOut', async (_, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authApi.logOut()
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
        dispatch(deleteUserAC())
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
})

export const loginTC = createAsyncThunk('auth/login', async (data: LoginRequestType, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authApi.login(data)
        if (res.status === 200) {
            dispatch(setIsLoggedInAC({isLoggedIn: true}))
            dispatch(setUserAC(res.data))
        } else {
            dispatch(setAppError({error: 'Network error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
})

export const registerTC = createAsyncThunk('auth/register', async (data: RegistrationRequestType, {dispatch}) => {
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const response = await authApi.register(data);
        if (response.statusText === 'Created') {
            dispatch(loginTC(data))
            dispatch(setIsLoggedInAC({isLoggedIn: true}));
        } else {
            dispatch(setAppError({error: 'Network error'}))
        }
    } catch (e: any) {
        handleServerAppError(e, dispatch)
        dispatch(setIsLoggedInAC({isLoggedIn: false}))
    } finally {
        dispatch(setAppStatus({status: 'succeeded'}))
    }
})

export const initializeAppTC = createAsyncThunk('auth/initializeApp', async (_, {dispatch}) => {
    dispatch(setIsInitialized({isInitialized: false}))
    dispatch(setAppStatus({status: 'loading'}))
    try {
        const res = await authApi.me()
        dispatch(setIsLoggedInAC({isLoggedIn: true}))
        dispatch(setUserAC(res.data))
        dispatch(setNewAvatarAC(res.data.avatar))
        dispatch(setIsInitialized({isInitialized: true}))

    } catch (e: any) {
        handleServerAppError(e, dispatch)
        dispatch(setIsLoggedInAC({isLoggedIn: false}))

    } finally {
        dispatch(setIsInitialized({isInitialized: true}))
        dispatch(setAppStatus({status: 'succeeded'}))
    }
})

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsInitialized(state, action: PayloadAction<{ isInitialized: boolean }>) {
            state.isInitialized = action.payload.isInitialized
        },
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    }
})

export const auth = slice.reducer

export const {setIsInitialized, setIsLoggedInAC} = slice.actions

export type AuthActionsType =
    ReturnType<typeof setIsInitialized>
    | ReturnType<typeof setIsLoggedInAC>



