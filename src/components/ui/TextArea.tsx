import React, { TextareaHTMLAttributes } from 'react'

interface InputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    name: string
    label: string
}

const TextArea = ({ id, name, label, rows, ...props }: InputProps) => {
    return (
        <div className='base-input-container'>
            <label htmlFor={id} className='base-input-label'>
                {label}
            </label>
            <textarea
                id={id}
                name={name}
                className='base-input-field base-text-area'
                rows={rows ?? 4}
                {...props}
            />
        </div>
    )
}

export default TextArea
