import {RootThunkType} from "../store/store";
import {cardsApi, LoginRequestType} from "../../dal/api/CardsApi";
import {setAppError, setAppStatus} from "./app";


const initialState = {
    isLoggedIn: false
}

export const login = (state = initialState, action: LoginReducerActionsType): LoginReducerInitialStateType => {
    switch (action.type) {
        case 'SET-IS-LOGGED-IN':
            return {
                ...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//------------------action creators-----------------------

export const IsLoggedInAC = (value:boolean) =>
    ({type: 'SET-IS-LOGGED-IN', value} as const)

//------------------thunks-----------------------

export const loginTC = (data: LoginRequestType): RootThunkType => async (dispatch) => {
    try {
        dispatch(setAppStatus('loading'))
        const res = await cardsApi.login(data)
        if (res.status === 200) {
            dispatch(IsLoggedInAC(true))
        }
    } catch (e: any) {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console');
        dispatch(setAppError(error))
    }
    finally {
        dispatch(setAppStatus('succeeded'))
    }
}



//------------------types-----------------------
export type LoginReducerInitialStateType = typeof initialState

export type LoginReducerActionsType = ReturnType<typeof IsLoggedInAC>
