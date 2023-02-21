import {AppActionsType, setAppError} from "../bll/reducers/app";
import {Dispatch} from "redux";

export const handleServerAppError = (e: any, dispatch: ErrorUtilsDispatchType) => {
    const error = e.response
        ? e.response.data.error
        : (e.message + ', more details in the console')
    dispatch(setAppError(error))
}


type ErrorUtilsDispatchType = Dispatch<AppActionsType>