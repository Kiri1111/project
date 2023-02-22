import React from 'react';
import style from './Login.module.scss'
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../hooks/redux";
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {Preloader} from "../../common/components/preloader/Preloader";
import {loginTC} from "../../../bll/reducers/auth";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const error = useAppSelector(state => state.app.error)
    const status = useAppSelector(state => state.app.status)

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
        return <Navigate to={'/profile'}/>
    }
    console.log(status)
    return (
        <div className={style.loginContainer}>
            <Grid container justifyContent={'center'}>
                <Grid item justifyContent={'center'}>
                    <FormControl>
                        <div className={style.formBlock}>
                            {status === 'loading'
                                ? <Preloader width={'100px'}/>
                                : <form onSubmit={formik.handleSubmit}>
                                    <FormGroup>
                                        <TextField
                                            label="Email"
                                            margin="normal"
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email &&
                                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                        <TextField
                                            type="password"
                                            label="Password"
                                            margin="normal"
                                            {...formik.getFieldProps('password')}
                                        />
                                        {formik.touched.password && formik.errors.password &&
                                            <div style={{color: 'red'}}>{formik.errors.password}</div>}
                                        <FormControlLabel label={'Remember me'} control={<Checkbox
                                            checked={formik.values.rememberMe}
                                            {...formik.getFieldProps('rememberMe')}
                                        />}/>
                                        <Button type={'submit'}
                                                variant={'contained'}
                                                color={'secondary'}>
                                            Login
                                        </Button>
                                        {error && <span style={{color: 'red', fontSize: '15px'}}>{error}</span>}
                                    </FormGroup>
                                </form>
                            }
                        </div>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};

