import React from 'react'
import Button from '@/components/ui/Button'
import { useFormStatus } from 'react-dom'

export default function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' variant='primary' disabled={pending}>
            {pending ? 'Creating post ...' : 'Add post'}
        </Button>
    )
}
