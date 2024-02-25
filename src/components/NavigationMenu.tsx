'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useClickOutside } from '@/hooks/useClickOutside'
import { Bars, Close } from '@/assets/icons'
import { NAV_ITEMS } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { Logo } from '@/assets/logos'
import { signOut } from 'next-auth/react'

type NavigationMenuProps = {
    user?:
        | { name?: string | null; email?: string | null; image?: string | null }
        | undefined
}

const NavigationMenu = ({ user }: NavigationMenuProps) => {
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    const onMenuToggle = () => {
        setOpen((prev) => !prev)
    }

    const onMenuClose = () => {
        setOpen(false)
    }

    const [ref] = useClickOutside(onMenuClose)

    useEffect(() => {
        handleCloseNav()
    }, [pathname])

    const handleCloseNav = () => {
        setOpen(false)
    }

    const hasAuth = !!user

    const navItemsToRender = useMemo(() => {
        return hasAuth
            ? NAV_ITEMS
            : NAV_ITEMS.filter(({ requireAuth }) => !requireAuth)
    }, [hasAuth])

    return (
        <div>
            <header className='header'>
                <div className='top-container'>
                    <div className='logo-container'>
                        <Link href='/' className='logo'>
                            <Logo className='logo-img' />
                            <div className='logo-text'>Simon.js</div>
                        </Link>
                    </div>

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
                                    />
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className='top-right-container'>
                        <div className='profile-container'>
                            {user ? (
                                <button
                                    onClick={() => {
                                        signOut()
                                    }}
                                    className='button button-primary profile-button'
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    href='/api/auth/signin'
                                    className='button button-primary profile-button'
                                >
                                    Login
                                </Link>
                            )}
                        </div>

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
