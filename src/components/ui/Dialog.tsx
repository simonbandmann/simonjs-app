'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'

const Dialog = ({
    open,
    onOpenChange,
    children,
}: {
    open?: boolean
    // eslint-disable-next-line no-unused-vars
    onOpenChange?: (open: boolean) => void
    children: ReactNode
}) => {
    return (
        <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
            {children}
        </RadixDialog.Root>
    )
}

const Content = ({
    title,
    description,
    children,
}: {
    title?: string
    description?: string
    children: ReactNode
}) => {
    return (
        <RadixDialog.Portal>
            <RadixDialog.Overlay className='dialog-overlay' />
            <RadixDialog.Content className='dialog-content'>
                {title !== '' && <RadixDialog.Title>{title}</RadixDialog.Title>}
                <RadixDialog.Description>{description}</RadixDialog.Description>
                {children}
                <RadixDialog.Close className='dialog-close-button'>
                    <Cross1Icon />
                </RadixDialog.Close>
            </RadixDialog.Content>
        </RadixDialog.Portal>
    )
}

Dialog.Close = RadixDialog.Close
Dialog.Trigger = RadixDialog.Trigger
Dialog.Content = Content

export default Dialog
