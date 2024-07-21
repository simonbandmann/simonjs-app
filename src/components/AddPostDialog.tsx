'use client'

import Dialog from '@/components/ui/Dialog'
import { useState } from 'react'
import Button from './ui/Button'
import AddPostForm from './AddPostForm'

const AddPostDialog = () => {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant='primary'>Add new post</Button>
            </Dialog.Trigger>
            <Dialog.Content title='Add new blog post'>
                <AddPostForm />
            </Dialog.Content>
        </Dialog>
    )
}

export default AddPostDialog
