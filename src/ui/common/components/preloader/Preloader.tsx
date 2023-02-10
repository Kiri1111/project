import React from 'react';
import preloader from '../../assets/images/preloader.gif'

type PreloaderWidthType = {
    width: string
}

export const Preloader = (props: PreloaderWidthType) => {
    return (
        <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <img alt={'Preloader'} style={{width: props.width}} src={preloader}/>
        </div>
    );
};

