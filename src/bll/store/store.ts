import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {profile, ProfileReducerActionsType} from "../reducers/profile";
import {app, appActionsType} from "../reducers/app";
import {auth, authActionsType} from "../reducers/auth";

const rootReducer = combineReducers({
    profile,
    app,
    auth
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//------------------types-----------------------

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType =
    | ProfileReducerActionsType
    | appActionsType
    | authActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store;
