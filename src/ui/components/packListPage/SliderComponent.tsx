import * as React from 'react';
import Slider from '@mui/material/Slider';
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {FC, useEffect, useState} from "react";
import style from "./SliderComponent.module.scss"
import {useDebounce} from "usehooks-ts";

type SliderPropsType = {
    setMin: (min: number) => void
    setMax: (max: number) => void
    min: number
    max: number
}

export const SliderComponent: FC<SliderPropsType> = ({setMin, setMax, min, max}) => {
    const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)
    const minCardsCount = useAppSelector(state => state.packList.minCardsCount)

    const handleChange = (event: Event, newValue: number | number[]) => {
        if (Array.isArray(newValue)) {
            setMin(newValue[0])
            setMax(newValue[1])
        }
    }

    return (
        <div className={style.sliderBlock}>
            <h4 className={style.title}>Number of cards</h4>
            <span className={style.span}>{min}</span>
            <Slider
                value={[min, max]}
                onChange={handleChange}
                max={maxCardsCount}
            />
            <span className={style.span}>{max}</span>
        </div>
    );
}
