import React from 'react';
import style from './Demo.module.scss'
import {Input} from "../../common/components/commonInput/Input";
import Button from "../../common/components/commonButton/Button";
import Checkbox from "../../common/components/commonCheckbox/Checkbox";

export const Demo = () => {
    return (
        <div className={style.demoBlock}>
            <h1>Demo Page</h1>
            <Input/>
            <Button title={'Click mee)'} onClickCallBack={() => {
            }}/>
            <Checkbox/>
        </div>
    );
};

