const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
}


export const app = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.payload.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.payload.error}
        default:
            return state
    }
}


export const setAppStatus = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', payload: {status}} as const)
export const setAppError = (error: string | null) => ({type: 'APP/SET-ERROR', payload: {error}} as const)


export type AppActionsType = ReturnType<typeof setAppStatus> | ReturnType<typeof setAppError>
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState
