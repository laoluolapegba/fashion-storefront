# fashion-storefront   ← (or fashion-admin)

Next.js 14 · TypeScript · Tailwind CSS

## Getting Started
```bash
cp .env.example .env.local   # fill in values
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command              | Description               |
|----------------------|---------------------------|
| `npm run dev`        | Start dev server          |
| `npm run build`      | Production build          |
| `npm run lint`       | Run ESLint                |
| `npm run format`     | Format with Prettier      |
| `npm run type-check` | TypeScript check          |

## Branch Strategy

- `main` — production-ready
- `develop` — integration branch
- `feature/*` — all new work