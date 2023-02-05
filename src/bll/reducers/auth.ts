const initialState = {
    isLoggedIn: false,
    isInitialized: false
}


export const auth = (state: InitialStateType = initialState, action: authActionsType): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.isLoggedIn}
        case 'AUTH/SET-INITIALIZED':
            return {...state, isInitialized: action.payload.isInitialized}
        default:
            return state
    }
}


export const setIsInitialized = (isInitialized: boolean) => ({
    type: 'AUTH/SET-INITIALIZED',
    payload: {isInitialized}
} as const)

export const setIsLoggedInAC = (isLoggedIn: boolean) =>
    ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)

export type authActionsType = ReturnType<typeof setIsInitialized> | ReturnType<typeof setIsLoggedInAC>
type InitialStateType = typeof initialState
