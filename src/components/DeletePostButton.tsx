'use client'

import { deletePostAction } from '@/actions'
import React from 'react'
import Button from './ui/Button'

export default function DeletePostButton({ postId }: { postId: number }) {
    return (
        <Button variant='base' onClick={() => deletePostAction(postId)}>
            Delete
        </Button>
    )
}
