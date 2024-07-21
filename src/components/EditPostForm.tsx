'use client'

import React from 'react'
import Button from '@/components/ui/Button'
import TextArea from '@/components/ui/TextArea'
import TextField from '@/components/ui/TextField'
import { Post } from './EditPostDialog'
import { editPostAction } from '@/actions'

const EditPostForm = ({
    onClose,
    postData,
}: {
    onClose?: () => void
    postData: Post
}) => {
    const editPostWithId = editPostAction.bind(null, postData.id)

    return (
        <form
            className='base-form'
            action={editPostWithId}
            onSubmit={() => {
                onClose?.()
            }}
        >
            <TextField
                id='title'
                label='Post name'
                type='text'
                defaultValue={postData?.title}
                placeholder='Post name...'
            />
            <TextArea
                id='content'
                name='content'
                label='Content'
                defaultValue={postData?.content}
                placeholder='Content body...'
            />
            <Button type='submit' variant='primary'>
                Save
            </Button>
        </form>
    )
}

export default EditPostForm
