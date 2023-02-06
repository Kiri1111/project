import React from 'react';
import style from './Registration.module.scss'
import {useFormik} from 'formik';
import Button from '../../common/components/commonButton/Button';
import {RegistrationInputLabel} from './RegistrationInputLabel';


type FormValuesType = {
    email: string
    password: string
    confirmPassword: string
}

export const Registration: React.FC = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: (values: FormValuesType) => {
            const errors: Partial<Omit<any, 'captcha'>> = {
            };
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 8) {
                errors.password = 'minimum password length 8 characters';
            }

            return errors;
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
        }
    });



    return (
        <div className={style.registerBlock}>
            <h1>Register page</h1>
            <form onSubmit={formik.handleSubmit}>
                <RegistrationInputLabel text='Email' {...formik.getFieldProps('email')} />
                <RegistrationInputLabel text='Password' {...formik.getFieldProps('password')}/>
                <RegistrationInputLabel text='Confirm password' {...formik.getFieldProps('confirmPassword')}/>
                <Button title={'Sign Up'}/>
            </form>
        </div>
    );
};

