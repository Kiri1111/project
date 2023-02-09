import React from 'react';
import style from './Registration.module.scss'
import {useFormik} from 'formik';
import Button from '../../common/components/commonButton/Button';
import {RegistrationInputLabel} from './RegistrationInputLabel';
import * as yup from 'yup';
import {registerTC} from '../../../bll/reducers/registration';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {Navigate} from 'react-router-dom';


type FormValuesType = {
    email: string
    password: string
    confirmPassword: string
}

export const Registration: React.FC = () => {

    const dispatch = useAppDispatch();
    const isLoginIn = useAppSelector(state => state.registration.isLoginIn);

    const chema = yup.object().shape({
        email: yup.string().matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Invalid email address').typeError('Invalid email address').required('Required'),
        password: yup.string().min(8, () => 'minimum password length 8 characters').required('Required'),
        confirmPassword: yup.string().oneOf([yup.ref('password')], 'Given passwords are not equal!').required('Required'),
    });

    const compareStrAndLength = (a: string, b: string) => {
        if (a.length && b.length && a.localeCompare(b) === 0) {
            return false
        }
        return true
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: chema,
        onSubmit: (values: FormValuesType) => {
            dispatch(registerTC(values.email, values.password));
        }
    });

    if (isLoginIn) {
        return <Navigate to={'/profile'}/>;
    }

    return (

        <div className={style.registerBlock}>
            <h1>Register page</h1>
            <form>
                <RegistrationInputLabel text='Email' {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email && <div style={{color: "red"}}>{formik.errors.email}</div>}
                <RegistrationInputLabel text='Password' {...formik.getFieldProps('password')} type={'password'}/>
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: "red"}}>{formik.errors.password}</div>}
                <RegistrationInputLabel text='Confirm password' {...formik.getFieldProps('confirmPassword')}
                                        type={'password'}/>
                {formik.touched.confirmPassword && formik.errors.confirmPassword &&
                    <div style={{color: "red"}}>{formik.errors.confirmPassword}</div>}
                <Button title={'Sign Up'} onClickCallBack={formik.handleSubmit} type={'button'}
                        disabled={compareStrAndLength(formik.values.password, formik.values.confirmPassword)}/>
            </form>
        </div>
    );
};

