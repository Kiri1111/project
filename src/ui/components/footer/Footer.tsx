import React from 'react';
import style from "./Footer.module.scss"
import footerImg from "./../../common/assets/images/footer.png"

export const Footer = () => {
    const footerBack = {
        backgroundImage: `url(${footerImg})`
    }
    return (
        <div className={style.footerBlock} style={footerBack}>
            
        </div>
    );
};

