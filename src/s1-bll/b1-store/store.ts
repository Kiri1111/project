import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {FirsReducerActionsType, firstReducer} from "../b2-reducers/firstReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {secondReducer, SecondReducerActionsType} from "../b2-reducers/secondReducer";
import {thirdReducer} from "../b2-reducers/thirdReducer";

const rootReducer = combineReducers({
    first: firstReducer,
    second: secondReducer,
    third: thirdReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

//------------------types-----------------------

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType = FirsReducerActionsType | SecondReducerActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store;
