import {useSelector} from "react-redux";
import {TypedUseSelectorHook, useDispatch} from "react-redux";
import {AppThunkDispatch, AppRootStateType} from "../bll/store/store";


export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
