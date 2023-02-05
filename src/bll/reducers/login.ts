import {RootThunkType} from "../store/store";

const initialState = {}

export const login = (state = initialState, action: LoginReducerActionsType): LoginReducerInitialStateType => {
    switch (action.type) {
        case 'BLA':
            return state
        case 'BLA-BLA':
            return state
        default:
            return state
    }
}

//------------------action creators-----------------------

export const bla = () => ({type: 'BLA', payload: {first: 'bla'}} as const)

export const blaBla = () => ({type: 'BLA-BLA', payload: {second: 'bla-bla'}} as const)

//------------------thunks-----------------------

export const thunk = (): RootThunkType => (dispatch) => {
    dispatch(bla())
}

export const thunkSecond = (): RootThunkType => (dispatch) => {
    dispatch(blaBla())
}

//------------------types-----------------------
export type LoginReducerInitialStateType = typeof initialState

export type LoginReducerActionsType = ReturnType<typeof bla> | ReturnType<typeof blaBla>