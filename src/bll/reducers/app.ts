const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}


export const app = (state: InitialStateType = initialState, action: appActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}


export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error}} as const)
export const setAppIsInitialized = (isInitialized: boolean) => ({
    type: 'APP/SET-INITIALIZED',
    payload: {isInitialized}
} as const)


export type appActionsType =
    ReturnType<typeof setAppStatus>
    | ReturnType<typeof setAppError>
    | ReturnType<typeof setAppIsInitialized>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
