import React, { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string
}

const TextField = ({ id, label, type, ...props }: InputProps) => {
    return (
        <div className='base-input-container'>
            <label htmlFor={id} className='base-input-label'>
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type ?? 'text'}
                className='base-input-field'
                {...props}
            />
        </div>
    )
}

export default TextField
