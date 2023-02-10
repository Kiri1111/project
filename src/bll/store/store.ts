import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {LoginReducerActionsType, login} from "../reducers/login";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {registration, RegistrationActionsType} from "../reducers/registration";
import {profile, ProfileReducerActionsType} from "../reducers/profile";
import {app, appActionsType} from "../reducers/app";
import {auth, authActionsType} from "../reducers/auth";

const rootReducer = combineReducers({
    login:login,
    registration,
    profile,
    app,
    auth
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//------------------types-----------------------

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType =
    LoginReducerActionsType
    | RegistrationActionsType
    | ProfileReducerActionsType
    | appActionsType
    | authActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store;
