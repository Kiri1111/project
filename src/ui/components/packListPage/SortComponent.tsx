import React, {FC} from 'react'
import sortDown from '../../common/assets/images/sortDown.png'
import sortUp from '../../common/assets/images/sortUp.png'

type SortPropsType = {
    title: string
    onChange: (newSort?: string) => void
    sort: string
    value: string
}

const downIcon = sortDown
const upIcon = sortUp


export const SortComponent: FC<SortPropsType> = ({value, sort, title, onChange}) => {

    const up = '0' + value
    const down = '1' + value

    const icon = sort === down ? downIcon : upIcon

    const changeSort = (sort: string, up: string, down: string) => {
        switch (sort) {
            case`0${value}`:
                return down
            case `1${value}`:
                return up
        }
    }

    const onclickHandler = () => {
        onChange(changeSort(sort, up, down))
    }

    return (
        <div onClick={onclickHandler}>
            {title}
            <img src={icon} style={{width: '15px'}} alt={'sort icon'}/>
        </div>
    );
};

