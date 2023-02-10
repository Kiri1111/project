import { RootThunkType } from '../store/store';
import { cardsApi } from '../../dal/api/CardsApi';




const initialState = {
    loading: false,
    isLoginIn: false,
    error: null as string | null,
}

export const registration = (state: InitialStateType = initialState, action: RegistrationActionsType): InitialStateType => {
    switch (action.type) {
        case 'REGISTRATION/IS_LOADING':
            return { ...state, loading: action.payload.loading }
        case 'REGISTRATION/IS_LOGIN_IN':
            return { ...state, isLoginIn: action.payload.isLoginIn }
        case 'REGISTRATION/SET-ERROR':
            return { ...state, error: action.payload.error }
        default:
            return state
    }
}

//------------------action creators-----------------------

export const setLoading = (loading: boolean) => ({ type: 'REGISTRATION/IS_LOADING', payload: { loading } } as const)

export const setLoginIn = (isLoginIn: boolean) => ({ type: 'REGISTRATION/IS_LOGIN_IN', payload: { isLoginIn } } as const)

export const setError = (error: null | string) => ({ type: 'REGISTRATION/SET-ERROR', payload: { error } } as const)

//------------------thunks-----------------------

export const registerTC = (email: string, password: string): RootThunkType => async (dispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await cardsApi.register(email, password);
        if (response.statusText === 'Created') {
            dispatch(setLoginIn(true));
        }
        dispatch(setLoading(false));
    } catch (e: any) {
        const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
        dispatch(setError(error));
        dispatch(setLoading(false));
        dispatch(setLoginIn(false))
    }
}

//------------------types-----------------------
type InitialStateType = typeof initialState;

export type RegistrationActionsType = ReturnType<typeof setLoading> | ReturnType<typeof setLoginIn> | ReturnType<typeof setError>

