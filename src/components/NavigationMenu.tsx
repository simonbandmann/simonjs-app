'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Bars, Close } from '@/assets/icons'

type NavigationMenuProps = {
    user?:
        | { name?: string | null; email?: string | null; image?: string | null }
        | undefined
}

const NavigationMenu = ({ user }: NavigationMenuProps) => {
    const [open, setOpen] = useState(false)

    const onMenuToggle = () => {
        setOpen((prev) => !prev)
    }

    const onMenuClose = () => {
        setOpen(false)
    }

    const [ref] = useClickOutside(onMenuClose)

    return (
        <div>
            <header className='header'>
                <h1>Logo</h1>
                <div ref={ref} className='navigation-wrapper'>
                    <nav
                        id='primary-navigation'
                        className='navigation-container'
                        data-open={open}
                    >
                        <ul className='navigation-list'>
                            <NavigationItem text='Home' href='/' />
                            <NavigationItem text='Shop' href='/shop' />
                            <NavigationItem
                                text='Login'
                                href='/api/auth/signin'
                            />
                            {user && (
                                <NavigationItem
                                    text='Dashboard'
                                    href='/dashboard'
                                />
                            )}
                        </ul>
                    </nav>

                    <button
                        onClick={onMenuToggle}
                        className='mobile-navigation-toggle'
                        aria-controls='primary-navigation'
                        aria-expanded={open}
                    >
                        {open ? <Close /> : <Bars />}
                        <span className='sr-only'>Menu</span>
                    </button>
                </div>
            </header>
        </div>
    )
}

const NavigationItem = ({ text, href }: { text: string; href: string }) => {
    return (
        <Link href={href}>
            <li className='navigation-list-item'>{text}</li>
        </Link>
    )
}

export default NavigationMenu
