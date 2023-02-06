import {RootThunkType} from "../store/store";
import {cardsApi, ResponseType} from "../../dal/api/CardsApi";
import {setAppStatus} from "./app";

const initialState = {} as ResponseType

export const profile = (state = initialState, action: ProfileReducerActionsType): ProfileReducerInitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET-USER':
            return {
                ...state,
                _id: action.payload.user._id,
                name: action.payload.user.name,
                publicCardPacksCount: action.payload.user.publicCardPacksCount,
                email: action.payload.user.email
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
export const setNewNameAC = (newName: string) => ({type: 'PROFILE/SET-NEW-NAME', payload: {newName}} as const)
export const setNewAvatarAC = (newAvatar: string | null) => ({
    type: 'PROFILE/SET-NEW-AVATAR',
    payload: {newAvatar}
} as const)

//------------------thunks-----------------------

export const setNewNameTC = (newName: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await cardsApi.changeNewName(newName)
        debugger
        dispatch(setNewNameAC(res.data.data.name))
    } catch (e: any) {

    } finally {
        dispatch(setAppStatus('succeeded'))
    }
}

export const setNewAvatarTC = (newAvatar: string): RootThunkType => async (dispatch) => {
    dispatch(setAppStatus('loading'))
    try {
        const res = await cardsApi.changeNewAvatar(newAvatar)
        // console.log(res.data.data.updateUser.avatar)
// dispatch(setNewAvatarAC(res.data.data.avatar))

    } catch (e: any) {

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