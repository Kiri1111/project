import * as React from 'react';
import Slider from '@mui/material/Slider';
import {FC} from "react";
import style from "./SliderComponent.module.scss"

type SliderPropsType = {
    setMin: (min: number) => void
    setMax: (max: number) => void
    min: number
    max: number
    maxCardsCount: number
}

export const SliderComponent: FC<SliderPropsType> = ({maxCardsCount, setMin, setMax, min, max}) => {

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
