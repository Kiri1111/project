import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react'
import s from './Button.module.css'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
    xType?: string
    title: string
}

const Button: React.FC<SuperButtonPropsType> = (
    {
        title,
        xType,
        className,
        disabled,
        ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
    }
) => {
    const finalClassName = `${s.button} ${disabled === true ? s.disabled : ''}`
        + `${xType === "red" ? s.red : xType === 'secondary' ? s.secondary : s.default} ${className ? className : ''}`
    // `${xType === "red" ? s.red : s.default} ${className}`

    // s.button + (disabled ? '': xType === 'red' ?+ s.red + className ? ' ' + className : '') // задачка на смешивание классов
    return (
        <button
            disabled={disabled}
            className={finalClassName}
            {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
        >{title}</button>
    )
}

export default Button
