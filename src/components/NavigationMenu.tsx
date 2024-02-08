'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Bars, Close } from '@/assets/icons'
import { NAV_ITEMS } from '@/lib/constants'

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

    const handleCloseNav = () => {
        setOpen(false)
    }

    const hasAuth = !!user

    const navItemsToRender = hasAuth
        ? NAV_ITEMS
        : NAV_ITEMS.filter(({ requireAuth }) => !requireAuth)

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
                            {navItemsToRender.map(({ text, href }) => (
                                <NavigationItem
                                    key={text}
                                    text={text}
                                    href={href}
                                    onClose={handleCloseNav}
                                />
                            ))}
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

const NavigationItem = ({
    text,
    href,
    onClose,
}: {
    text: string
    href: string
    onClose?: () => void
}) => {
    return (
        <Link href={href} onClick={onClose}>
            <li className='navigation-list-item'>{text}</li>
        </Link>
    )
}

export default NavigationMenu
