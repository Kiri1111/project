import React from 'react';
import style from './Demo.module.scss'
import Input from "../../u1-common/c1-components/commonInput/Input";
import Button from "../../u1-common/c1-components/commonButton/Button";
import Checkbox from "../../u1-common/c1-components/commonCheckbox/Checkbox";

export const Demo = () => {
    return (
        <div className={style.demoBlock}>
            <h1>Demo Page</h1>
            <Input/>
            <Button title={'Click mee)'}/>
            <Checkbox/>
        </div>
    );
};

