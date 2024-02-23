'use client'

import AddStoreItemForm from '@/components/AddStoreItemForm'
import Dialog from '@/components/Dialog'
import { useState } from 'react'
import Button from './Button'

const AddItemDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant='primary'>Add</Button>
            </Dialog.Trigger>
            <Dialog.Content title='Add product to store'>
                <AddStoreItemForm onClose={() => setOpen(false)} />
            </Dialog.Content>
        </Dialog>
    )
}

export default AddItemDialog
