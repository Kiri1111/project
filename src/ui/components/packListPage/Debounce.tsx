import React, {FC} from 'react'
import style from "../learnPage/learnPage.module.css"
import loop from "../../common/assets/images/loop.png"

export const Debounce: FC<any> = ({value, setValue}) => {
    return (
        <div>
            <h4>Search</h4>
            <div className={style.inputContainer}>
                <img src={loop} alt="loop"/>
            <input placeholder={'Provide your text'} type="text" value={value}
                   onChange={(e) => setValue(e.currentTarget.value)}/>
            </div>
        </div>
    )
}
