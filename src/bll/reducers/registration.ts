import {RootThunkType} from '../store/store';
import {cardsApi} from '../../dal/api/CardsApi';
import {setIsInitialized, setIsLoggedInAC} from "./auth";


const initialState = {
    loading: false,
    isLoginIn: false,
}

export const registration = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/IS_LOADING':
            return {...state, loading: action.payload.loading}
        case 'REGISTRATION/IS_LOGIN_IN':
            return {...state, isLoginIn: action.payload.isLoginIn}
        default:
            return state
    }
}

//------------------action creators-----------------------

export const setLoading = (loading: boolean) => ({type: 'REGISTRATION/IS_LOADING', payload: {loading}} as const)

export const setLoginIn = (isLoginIn: boolean) => ({type: 'REGISTRATION/IS_LOGIN_IN', payload: {isLoginIn}} as const)

//------------------thunks-----------------------

export const registerTC = (email: string, password: string): RootThunkType => async (dispatch) => {
    dispatch(setLoading(true))
    // try {
    //     const response = await cardsApi.register();
    //     if (response.statusText === 'Created') {
    //         dispatch(setLoginIn(true));
    //         dispatch(setIsLoggedInAC(true));
    //         dispatch(setIsInitialized(true));
    //     }
    //     dispatch(setLoading(false));
    // } catch (e) {
    //     console.log("server error");
    // }
}

//------------------types-----------------------
type InitialStateType = typeof initialState;

export type RegistrationActionsType = ReturnType<typeof setLoading> | ReturnType<typeof setLoginIn>

