import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import '@/styles/globals.css'

const cormorant = Cormorant_Garamond({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600'],
    style: ['normal', 'italic'],
    variable: '--font-cormorant',
    display: 'swap',
})

const jost = Jost({
    subsets: ['latin'],
    weight: ['300', '400', '500'],
    variable: '--font-jost',
    display: 'swap',
})

export const metadata: Metadata = {
    title: { default: 'Eleven08', template: '%s | Eleven08' },
    description: 'Premium fashion. Private styling.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
            <body>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    )
}