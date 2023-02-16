import React, {FC} from 'react'
import {useAppDispatch} from "../../../hooks/redux";
import s from './Packlist.module.css'

/*type DebouncePropsType = {
    pageCount: number
}*/

export const Debounce: FC<any> = ({value, setValue}) => {

    const dispatch = useAppDispatch()

    return (
        <div>
<h4 className={s.h4}>Search</h4>
            <input placeholder={'Provide your text'} className={s.input} type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
        </div>
    )
}
