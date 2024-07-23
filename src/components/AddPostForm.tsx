'use client'

import React, { FormEvent, useState } from 'react'
import TextArea from '@/components/ui/TextArea'
import TextField from '@/components/ui/TextField'
import SubmitButton from './SubmitButton'
import { addPostAction } from '@/actions'

const AddPostForm = () => {
    // const [files, setFiles] = useState([])

    // const handleFileChange = (event: FormEvent<HTMLInputElement>) => {
    //     setFiles(Array.from(event.target.files))
    // }

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault()
    //     // Prepare form data
    //     const formData = new FormData(event.target)
    //     console.log(formData)
    //     // files.forEach((file) => {
    //     //     formData.append('images', file)
    //     // })

    //     // // Process the form data here (e.g., send it to a server)
    //     // // For demonstration, we'll log the formData keys and values
    //     // for (let [key, value] of formData.entries()) {
    //     //     console.log(key, value)
    //     // }

    //     addPostAction(formData)
    // }

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
                // required
            />
            <SubmitButton />
        </form>
    )
}

export default AddPostForm
