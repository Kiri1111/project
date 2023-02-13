import {ChangeEvent, FC, useEffect, useState} from 'react'
import {useDebounce} from 'usehooks-ts'
import {useAppDispatch} from "../../../hooks/redux";
import {setSearchValueAC} from "../../../bll/reducers/packList";

type DebouncePropsType = {
    pageCount: number
}

export const Debounce: FC<DebouncePropsType> = ({pageCount}) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 1000)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setSearchValueAC(debouncedValue))
    }, [debouncedValue])

    return (
        <div>
            <input type="text" value={value} onChange={handleChange}/>
        </div>
    )
}
