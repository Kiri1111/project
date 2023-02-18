import React, {FC} from 'react'

export const Debounce: FC<any> = ({value, setValue}) => {
    return (
        <div>
            <h4>Search</h4>
            <input placeholder={'Provide your text'} type="text" value={value}
                   onChange={(e) => setValue(e.currentTarget.value)}/>
        </div>
    )
}
