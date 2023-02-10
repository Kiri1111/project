import React from 'react';
import style from './Login.module.scss'
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {loginTC} from "../../../bll/reducers/login";


type FormikErrorType = {
    email?: string,
    password?: string
}

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const error = useAppSelector(state => state.app.error)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address').required('Required'),
            password: Yup.string()
                .min(4, 'Length should be more 4 symbols')
                .max(20, 'Must be 20 characters or less')
                .required('Required'),

        }),
        onSubmit: values => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    });
    if (isLoggedIn) {
        debugger
        return <Navigate to={'/profile'}/>
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <FormControl>
                    <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            checked={formik.values.rememberMe}
                            {...formik.getFieldProps('rememberMe')}
                        />}/>
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>
                            Login
                        </Button>
                        {error && <span style={{color: 'red', fontSize: '15px'}}>{error}</span>}
                    </FormGroup>
                </form>
                </FormControl>
            </Grid>
        </Grid>
    );
};

