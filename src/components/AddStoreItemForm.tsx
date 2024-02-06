'use client'

import React from 'react'
import Button from '@/components/Button'
import TextArea from '@/components/TextArea'
import TextField from '@/components/TextField'
import { addStoreItem } from '@/actions'

const AddStoreItemForm = ({ onClose }: { onClose: () => void }) => {
    return (
        <form
            className='base-form'
            action={addStoreItem}
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
            <TextField
                id='quantity'
                label='Add a quantity in stock'
                type='number'
                defaultValue={1}
                min={1}
                placeholder='Quantity'
            />
            <TextArea
                id='description'
                name='description'
                label='Item description'
                placeholder='Item description...'
            />
            <label htmlFor='image' className='base-input-label'>
                Image
            </label>
            <input id='image' name='image' type='file' accept='/image/*' />
            <Button type='submit'>Add product</Button>
        </form>
    )
}

export default AddStoreItemForm
