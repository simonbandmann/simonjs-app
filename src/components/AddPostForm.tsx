'use client'

import React from 'react'
import TextArea from '@/components/ui/TextArea'
import TextField from '@/components/ui/TextField'
import SubmitButton from './SubmitButton'
import { addPostAction } from '@/actions'

const AddPostForm = () => {
    return (
        <form className='base-form' action={addPostAction}>
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
                name='image'
                type='file'
                accept='/image/*'
                // required
            />
            <SubmitButton />
        </form>
    )
}

export default AddPostForm
