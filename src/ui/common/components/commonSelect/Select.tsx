import React, {
    SelectHTMLAttributes,
    DetailedHTMLProps,
    ChangeEvent,
} from 'react'
import s from '../../../components/packListPage/Packlist.module.scss'


type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    options?: any[]
    onChangeOption?: (option: number) => void
}

export const Select: React.FC<SuperSelectPropsType> = (
    {
        options,
        onChange,
        onChangeOption,
        ...restProps
    }) => {
    const mappedOptions: any[] = options
        ? options.map((o) => (
            <option
                key={o.id}
                value={o.id}
            >
                {o.value}
            </option>
        ))
        : [] // map options with key

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        // делают студенты
        if (onChangeOption)
            onChangeOption(Number(e.currentTarget.value))
    }


    return (
        <select className={s.sliderPagination}
                onChange={onChangeCallback}
                {...restProps}
        >
            {mappedOptions}
        </select>
    )
}
