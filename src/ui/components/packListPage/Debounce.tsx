import {ChangeEvent, FC, memo, useEffect, useState} from 'react'
import {useDebounce} from 'usehooks-ts'
import {useAppDispatch} from "../../../hooks/redux";
import {setSearchValueAC} from "../../../bll/reducers/packList";

/*type DebouncePropsType = {
    pageCount: number
}*/

export const Debounce: FC<any> = ({value, setValue}) => {
    console.log('kjkjkj')
    const dispatch = useAppDispatch()

    return (
        <div>
            <input type="text" value={value} onChange={(e) => setValue(e.currentTarget.value)}/>
        </div>
    )
}
