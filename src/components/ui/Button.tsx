import React, {
    ButtonHTMLAttributes,
    ForwardedRef,
    forwardRef,
    ReactNode,
} from 'react'

interface InputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    variant: 'base' | 'primary'
}

const MyButton = forwardRef(function Button(
    { children, variant, ...props }: InputProps,
    ref: ForwardedRef<HTMLButtonElement>,
) {
    return (
        <button className={`button button-${variant}`} {...props} ref={ref}>
            {children}
        </button>
    )
})

export default MyButton
