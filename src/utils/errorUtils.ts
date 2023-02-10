import {appActionsType, setAppError, setAppStatus} from "../bll/reducers/app";
import {Dispatch} from "redux";
import {setNewNameAC} from "../bll/reducers/profile";

export const handleServerAppError = (res: any, dispatch: ErrorUtilsDispatchType) => {

    // if (res.status === 200) {
    //     dispatch(setNewNameAC(res.data.updatedUser.name))
    // } else {
    //     dispatch(setAppError('Error'))
    // }

}


type ErrorUtilsDispatchType = Dispatch<appActionsType>