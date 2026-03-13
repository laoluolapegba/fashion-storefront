'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
    { label: 'Shop', href: '/shop' },
    { label: 'Collections', href: '/collections' },
    { label: 'Aso-Ebi', href: '/aso-ebi' },
    { label: 'Custom Order', href: '/custom-order' },
    { label: 'About', href: '/about' },
]

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
            background: 'var(--color-ivory)',
            borderBottom: '1px solid var(--color-linen)',
            height: 64,
        }}>
            <div style={{
                maxWidth: 1280, margin: '0 auto',
                padding: '0 48px', height: '100%',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                {/* Logo */}
                <Link href="/" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 22, fontWeight: 300,
                    letterSpacing: '0.12em',
                    color: 'var(--color-obsidian)',
                    textDecoration: 'none',
                }}>
                    ELEVEN08
                </Link>

                {/* Desktop nav */}
                <nav style={{ display: 'flex', gap: 32 }}>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 10, fontWeight: 400,
                            letterSpacing: '0.2em',
                            textTransform: 'uppercase',
                            color: 'var(--color-smoke)',
                            textDecoration: 'none',
                        }}>
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                    <Link href="/book-consultation" style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: 10, fontWeight: 400,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: 'var(--color-obsidian)',
                        textDecoration: 'none',
                        padding: '8px 20px',
                        border: '1px solid var(--color-obsidian)',
                    }}>
                        Book Styling
                    </Link>
                </div>
            </div>
        </header>
    )
}