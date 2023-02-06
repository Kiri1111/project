import React from 'react';
import style from './Registration.module.scss'
import {useFormik} from 'formik';
import Input from '../../common/components/commonInput/Input';
import Button from '../../common/components/commonButton/Button';
import {RegistrationInputLabel} from './RegistrationInputLabel';


export const Registration: React.FC = () => {
    return (
        <div className={style.registerBlock}>
            <h1>Register page</h1>
            <form>
                <RegistrationInputLabel text='Email'/>
                <RegistrationInputLabel text='Password'/>
                <RegistrationInputLabel text='Confirm password'/>
                <Button title={'Sign Up'}/>
            </form>
        </div>
    );
};

