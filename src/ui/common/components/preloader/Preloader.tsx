import React from 'react';
import preloader from '../../assets/images/preloader.gif'

type PreloaderWidthType = {
    width: string
}

export const Preloader = (props: PreloaderWidthType) => {
    return (
        <div style={{position: 'relative', top: '30%', width: '100%'}}>
            <img alt={'Preloader'} style={{width: props.width}} src={preloader}/>
        </div>
    );
};

