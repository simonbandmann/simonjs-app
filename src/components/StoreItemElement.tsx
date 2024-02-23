'use client'

import { StoreItem, deleteStoreItem, updateStoreItem } from '@/actions'
import Image from 'next/image'
import Dialog from './Dialog'
import TextField from './TextField'
import Button from './Button'
import { useState } from 'react'

const StoreItemElement = ({ item }: { item: StoreItem }) => {
    const initialName = item?.name || ''
    const [name, setName] = useState(initialName)

    const id = item?.id
    if (!id) return null

    return (
        <li className='dashboard-item-element'>
            <div className='dashboard-item-title'>{item.name}</div>
            <div className='dashboard-item-description'>{item.description}</div>
            {item.image && (
                <Image
                    src={item?.image[0]}
                    alt='alt'
                    width={300}
                    height={300}
                    className=''
                    style={{ objectFit: 'contain' }}
                />
            )}
            <div>
                <Dialog>
                    <Dialog.Trigger asChild>
                        <Button variant='primary'>Edit</Button>
                    </Dialog.Trigger>
                    <Dialog.Content title='Edit Store Item'>
                        <div className='base-form'>
                            <TextField
                                id='name'
                                label='Name'
                                name='name'
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                            />
                            <div className='edit-dialog-buttons'>
                                <Dialog.Close asChild>
                                    <Button
                                        variant='primary'
                                        onClick={async () => {
                                            await updateStoreItem(id, name)
                                        }}
                                    >
                                        Save
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close asChild>
                                    <Button
                                        variant='base'
                                        onClick={async () => {
                                            await deleteStoreItem(id)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Dialog.Close>
                            </div>
                        </div>
                    </Dialog.Content>
                </Dialog>
            </div>
        </li>
    )
}

export default StoreItemElement
