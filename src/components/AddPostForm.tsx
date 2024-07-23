'use client'

import React from 'react'
import TextArea from '@/components/ui/TextArea'
import TextField from '@/components/ui/TextField'
import SubmitButton from './SubmitButton'
import { addPostAction } from '@/actions'

const AddPostForm = () => {
    return (
        <form
            className='base-form'
            encType='multipart/form-data'
            action={addPostAction}
        >
            <TextField
                id='title'
                label='Post name'
                type='text'
                placeholder='Post name...'
                required
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
            <input
                id='image'
                name='images'
                type='file'
                accept='/image/*'
                multiple
            />
            <SubmitButton />
        </form>
    )
}

export default AddPostForm
