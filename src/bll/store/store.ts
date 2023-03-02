import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {profile, ProfileReducerActionsType} from "../reducers/profile";
import {app, AppActionsType} from "../reducers/app";
import {auth, AuthActionsType} from "../reducers/auth";
import {packList, PackListActionsType} from "../reducers/packList";
import {CardsListActionsType, userPackList} from "../reducers/cards";

const rootReducer = combineReducers({
    profile,
    app,
    auth,
    packList,
    userPackList
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

//------------------types-----------------------

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType =
    | ProfileReducerActionsType
    | AppActionsType
    | AuthActionsType
    | PackListActionsType
| CardsListActionsType

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>

export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, RootActionsType>


// @ts-ignore
window.store = store;
