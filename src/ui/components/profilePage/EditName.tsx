import React, {ChangeEvent, FC, memo, useState} from 'react';
import style from "./Profile.module.scss";
import editName from "../../common/assets/images/editName.png";

type EditNamePropsType = {
    userName: string
    callBack: (value: string) => void
}

export const EditName: FC<EditNamePropsType> = memo(({userName, callBack}) => {
    const [editeMode, setEditeMode] = useState(false)
    const [value, setValue] = useState(userName)
    const imgClickHandler = () => {
        setEditeMode(true)
        setValue('')
    }

    const onBlurHandler = () => {
        setEditeMode(false)
        callBack(value)
    }

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <div>
            {
                editeMode
                    ? <input onChange={onChangeInputHandler} value={value} placeholder={'Enter new Name'}
                             onBlur={onBlurHandler} autoFocus/>
                    : <div className={style.nameText}>
                        Name: {value}
                        <img
                            onClick={imgClickHandler} alt={'change name'}
                            src={editName} className={style.changeNameIcon}
                        />
                    </div>
            }


        </div>
    );
})

