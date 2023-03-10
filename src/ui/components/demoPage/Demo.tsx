import React from 'react';
import style from './Demo.module.scss'
import {Input} from "../../common/components/commonInput/Input";
import Button from "../../common/components/commonButton/Button";
import Checkbox from "../../common/components/commonCheckbox/Checkbox";
import {useAppSelector} from "../../../hooks/redux";
import AddEditCard from "../modalPages/cardModal/AddEditCard";

export const Demo = () => {
    const error = useAppSelector(state => state.app.error)

    return (
        <div className={style.demoBlock}>
            <div style={{fontSize: '30px', color: 'red'}}>{error}</div>
            <h1>Demo Page Привет</h1>
            <Input/>
            <Button title={'Click mee)'} onClickCallBack={() => {
            }}/>
            <Checkbox/>
        </div>
    );
};

