import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {FirsReducerActionsType, login} from "../reducers/login";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {registration, SecondReducerActionsType} from "../reducers/registration";
import {profile, ThirdReducerActionsType} from "../reducers/profile";

const rootReducer = combineReducers({
    login,
    registration,
    profile,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//------------------types-----------------------

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType = FirsReducerActionsType | SecondReducerActionsType | ThirdReducerActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store;
