import {RootThunkType} from "../store/store";
import {ResponseType} from "../../dal/api/CardsApi";

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
        default:
            return state
    }
}

//------------------action creators-----------------------

export const setUserAC = (user: any) => ({type: 'PROFILE/SET-USER', payload: {user}} as const)

//------------------thunks-----------------------

export const setUserTC = (): RootThunkType => (dispatch) => {

    // dispatch(setUserAC())
}

//------------------types-----------------------
export type ProfileReducerInitialStateType = typeof initialState

export type ProfileReducerActionsType = ReturnType<typeof setUserAC>