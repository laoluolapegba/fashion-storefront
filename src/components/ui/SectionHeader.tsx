interface SectionHeaderProps {
  label?: string
  heading: string
  subheading?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeader({
  label,
  heading,
  subheading,
  align = 'left',
  dark = false,
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: '3rem',
      }}
    >
      {label && (
        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-burnt-orange)',
            margin: 0,
            marginBottom: '0.75rem',
          }}
        >
          {label}
        </p>
      )}
      <h2
        style={{
          margin: 0,
          marginBottom: subheading ? '1rem' : 0,
          fontFamily: 'var(--font-display)',
          fontSize: '40px',
          lineHeight: 1.1,
          fontWeight: 300,
          color: dark ? 'var(--color-cream)' : 'var(--color-espresso)',
        }}
      >
        {heading}
      </h2>
      {subheading && (
        <p
          style={{
            margin: 0,
            marginInline: align === 'center' ? 'auto' : 0,
            maxWidth: align === 'center' ? '640px' : '580px',
            fontFamily: 'var(--font-ui)',
            fontSize: '14px',
            lineHeight: 1.7,
            color: dark ? 'var(--color-ash)' : 'var(--color-smoke)',
          }}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}
