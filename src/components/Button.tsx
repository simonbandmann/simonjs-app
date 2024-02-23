import React, { ButtonHTMLAttributes, ReactNode } from 'react'

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant: 'base' | 'primary'
}

const Button = ({ children, variant, ...props }: InputProps) => {
    return (
        <button className={`button button-${variant}`} {...props}>
            {children}
        </button>
    )
}

export default Button
