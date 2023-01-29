import React from 'react';
import style from './App.module.scss'
import {Demo} from "./s3-ui/u2-components/demoPage/Demo";

export const App = () => {
    return (
        <div className={style.app}>
            <Demo/>
        </div>
    );
}

//@ts-ignore
// window.store=store