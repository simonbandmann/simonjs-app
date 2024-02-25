'use client'

import React from 'react'
import Button from '@/components/Button'
import TextArea from '@/components/TextArea'
import TextField from '@/components/TextField'
import { addPost } from '@/actions'

const AddPostForm = ({ onClose }: { onClose: () => void }) => {
    return (
        <form
            className='base-form'
            action={addPost}
            onSubmit={() => {
                onClose()
            }}
        >
            <TextField
                id='name'
                label='Item name'
                type='text'
                placeholder='Item name...'
            />
            <TextArea
                id='content'
                name='content'
                label='Content'
                placeholder='Content body...'
            />
            <label htmlFor='image' className='base-input-label'>
                Image
            </label>
            <input id='image' name='image' type='file' accept='/image/*' />
            <Button type='submit' variant='primary'>
                Add post
            </Button>
        </form>
    )
}

export default AddPostForm
