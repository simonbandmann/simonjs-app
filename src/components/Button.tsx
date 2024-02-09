import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
}

const Button = ({ children, ...props }: InputProps) => {
    return (
        <button className='button-base' {...props}>
            {children}
        </button>
    )
}

export default Button
