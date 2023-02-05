import React from 'react';
import style from './Registration.module.scss'
import {useFormik} from 'formik';
import Input from "../../common/components/commonInput/Input";
import Button from "../../common/components/commonButton/Button";


export const Registration = () => {
    return (
        <div className={style.registerBlock}>
            <h1>Register page</h1>
            <form>
                <Input />
                <Input />
                <Input />
                <Button title={'Sign Up'}/>
            </form>
        </div>
    );
};

