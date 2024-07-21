'use client'

import Dialog from '@/components/ui/Dialog'
import { useState } from 'react'
import Button from './ui/Button'
import EditPostForm from './EditPostForm'

export interface Post {
    id: number
    title: string
    content: string
    images: any[]
}

const EditPostDialog = ({ postData }: { postData: Post }) => {
    const [open, setOpen] = useState(false)

    function handleClose() {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant='primary'>Edit</Button>
            </Dialog.Trigger>
            <Dialog.Content title='Edit blog post'>
                <EditPostForm postData={postData} onClose={handleClose} />
            </Dialog.Content>
        </Dialog>
    )
}

export default EditPostDialog
