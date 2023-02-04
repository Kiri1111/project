import {RootThunkType} from "../store/store";

const initialState = {
    name: "Kir9",
    age: 30
}

export const profile = (state = initialState, action: ProfileReducerActionsType): ProfileReducerInitialStateType => {
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
export type ProfileReducerInitialStateType = typeof initialState

export type ProfileReducerActionsType = ReturnType<typeof bla> | ReturnType<typeof blaBla>