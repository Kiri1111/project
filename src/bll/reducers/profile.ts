import {RootThunkType} from "../store/store";
import {authApi, ResponseType} from "../../dal/api/authApi";
import {setAppError, setAppStatus} from "./app";

const initialState = {} as ResponseType

export const profile = (state = initialState, action: ProfileReducerActionsType): ProfileReducerInitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER':
            return {
                ...state,
                avatar: action.payload.user.avatar,
                _id: action.payload.user._id,
                name: action.payload.user.name,
                publicCardPacksCount: action.payload.user.publicCardPacksCount,
                email: action.payload.user.email
            }
        case "PROFILE/DELETE-USER":
            return {
                ...state,
                avatar: '',
                _id: '',
                name: '',
                publicCardPacksCount: 0,
                email: ''
            }
        case 'PROFILE/SET-NEW-NAME':
            return {...state, name: action.payload.newName}
        case 'PROFILE/SET-NEW-AVATAR':
            return {...state, avatar: action.payload.newAvatar}
        default:
            return state
    }
}

//------------------action creators-----------------------

export const setUserAC = (user: any) => ({type: 'PROFILE/SET-USER', payload: {user}} as const)
export const deleteUserAC = () => ({type: 'PROFILE/DELETE-USER'} as const)
export const setNewNameAC = (newName: string) => ({type: 'PROFILE/SET-NEW-NAME', payload: {newName}} as const)
export const setNewAvatarAC = (newAvatar: any | null) => ({
    type: 'PROFILE/SET-NEW-AVATAR',
    payload: {newAvatar}
} as const)

//------------------thunks-----------------------

export const setNewNameTC = (newName: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authApi.changeNewName(newName)
        if (res.status === 200) {
            dispatch(setNewNameAC(res.data.updatedUser.name))
        } else {
            dispatch(setAppError('Error'))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    } finally {
        dispatch(setAppStatus('succeeded'))
    }
}

export const setNewAvatarTC = (newAvatar: any): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await authApi.changeNewAvatar(newAvatar)
        if (res.status === 200) {
            dispatch(setNewAvatarAC(res.data.updatedUser.avatar))
        } else {
            dispatch(setAppError('Error'))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppError(error))
    } finally {
        dispatch(setAppStatus('succeeded'))

    }
}
//------------------types-----------------------
export type ProfileReducerInitialStateType = typeof initialState

export type ProfileReducerActionsType =
    ReturnType<typeof setUserAC>
    | ReturnType<typeof setNewNameAC>
    | ReturnType<typeof setNewAvatarAC>
    | ReturnType<typeof deleteUserAC>

