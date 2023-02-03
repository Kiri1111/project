import {RootThunkType} from "../b1-store/store";

const initialState = {}

export const thirdReducer = (state: ThirdReducerInitialStateType, action: ThirdReducerActionsType): ThirdReducerInitialStateType => {
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
export type ThirdReducerInitialStateType = typeof initialState

export type ThirdReducerActionsType = ReturnType<typeof bla> | ReturnType<typeof blaBla>