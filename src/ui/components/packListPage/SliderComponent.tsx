import * as React from 'react';
import Slider from '@mui/material/Slider';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {useEffect, useState} from "react";
import style from "./SliderComponent.module.scss"
import {setCardsPacksTC, setMinMaxCardsQuantityAC, setPackTC} from "../../../bll/reducers/packList";


export const RangeSlider = () => {

    const dispatch = useAppDispatch()
    const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)

    const [value1, setValue1] = useState(0)
    const [value2, setValue2] = useState(maxCardsCount)
    const [request, setRequest] = useState(true)

    useEffect(() => {
        if (maxCardsCount !== 0) {
            dispatch(setCardsPacksTC())
        }
        if (request) {
            dispatch(setCardsPacksTC())
            setRequest(false)
        }
    }, [maxCardsCount])

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setValue1(newValue[0])
            setValue2(newValue[1])
            dispatch(setMinMaxCardsQuantityAC(value1, value2))
        } else {
            setValue1(newValue)
        }
    };

    return (
        <div className={style.sliderBlock}>
            <h4 className={style.title}>Number of cards</h4>
            <span className={style.span}>{value1}</span>
            <Slider
                value={[value1, value2]}
                onChange={handleChange}

            />
            <span className={style.span}>{maxCardsCount}</span>

        </div>
    );
}
