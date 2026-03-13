import Link from 'next/link'

const footerLinks = {
    Shop: [
        { label: 'All Products', href: '/shop' },
        { label: 'Collections', href: '/collections' },
        { label: 'Aso-Ebi', href: '/aso-ebi' },
        { label: 'Custom Order', href: '/custom-order' },
    ],
    Services: [
        { label: 'Book Consultation', href: '/book-consultation' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ],
}

export function Footer() {
    return (
        <footer style={{
            background: 'var(--color-obsidian)',
            color: 'var(--color-ash)',
            padding: '64px 0 32px',
            marginTop: 'auto',
        }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: 48,
                    marginBottom: 48,
                    paddingBottom: 48,
                    borderBottom: '1px solid var(--color-graphite)',
                }}>
                    {/* Brand */}
                    <div>
                        <div style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 24, fontWeight: 300,
                            color: 'var(--color-white)',
                            letterSpacing: '0.12em',
                            marginBottom: 16,
                        }}>ELEVEN08</div>
                        <p style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: 12, lineHeight: 1.7,
                            color: 'var(--color-smoke)',
                            maxWidth: 240,
                        }}>
                            Premium fashion. Private styling. Crafted for those who know exactly who they are.
                        </p>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([group, links]) => (
                        <div key={group}>
                            <div style={{
                                fontFamily: 'var(--font-ui)',
                                fontSize: 9, fontWeight: 400,
                                letterSpacing: '0.25em',
                                textTransform: 'uppercase',
                                color: 'var(--color-gold)',
                                marginBottom: 16,
                            }}>{group}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {links.map(link => (
                                    <Link key={link.href} href={link.href} style={{
                                        fontFamily: 'var(--font-ui)',
                                        fontSize: 12,
                                        color: 'var(--color-smoke)',
                                        textDecoration: 'none',
                                    }}>
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--color-smoke)', letterSpacing: '0.08em' }}>
                        © {new Date().getFullYear()} Maison. All rights reserved.
                    </div>
                    <div style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--color-smoke)', letterSpacing: '0.08em' }}>
                        Privacy · Terms
                    </div>
                </div>
            </div>
        </footer>
    )
}