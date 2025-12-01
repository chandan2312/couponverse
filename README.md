# Couponverse - Multi-Regional Coupon Platform

A modern, multi-regional coupon and deals platform built with Next.js, Prisma, and MongoDB. Supports multiple countries and languages with country-specific analytics tracking.

## 🌍 Features

- **Multi-Country Support**: Stores can operate in multiple countries
- **Multi-Language**: Full i18n support (Russian, Spanish, English, Hindi)
- **Country-Specific Analytics**: Track store popularity separately per country
- **Reddit-Style Ranking**: Hot score algorithm for trending deals
- **AI-Powered Coupons**: Automated coupon generation (coupon-scraper)
- **Responsive Design**: Mobile-first UI with dark mode support
- **Monorepo Architecture**: Turborepo setup with shared UI package

## 🏗️ Tech Stack

- **Framework**: Next.js 16 with App Router
- **Database**: MongoDB with Prisma ORM
- **Monorepo**: Turborepo
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **AI**: Google Gemini API (for coupon generation)

## 📁 Project Structure

```
couponverse/
├── apps/
│   ├── kuponly.ru/          # Russian coupon site
│   ├── spanish.es/          # Spanish coupon site
│   └── coupon-scraper/      # AI coupon generation service
├── packages/
│   └── ui/                  # Shared UI components and Prisma schema
└── docs/                    # Documentation
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB database (local or Atlas)
- pnpm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/couponverse.git
cd couponverse

# Install dependencies
pnpm install

# Set up environment variables
cp packages/ui/.env.example packages/ui/.env
# Edit .env with your MongoDB connection string

# Push database schema
cd packages/ui
npx prisma db push
npx prisma generate

# Seed the database
npx tsx prisma/seed.ts

# Start development servers
cd ../..
pnpm dev
```

The apps will be available at:
- Russian site: http://localhost:3000
- Spanish site: http://localhost:3001

## 🗄️ Database Schema

Key models:
- **Store**: Multi-country stores with analytics tracking
- **StoreAnalytics**: Country-specific view/click tracking
- **Offer**: Coupons and deals with language/country filtering
- **Category**: Store categorization
- **Vote**: User voting for offer ranking

## 🌐 Multi-Country Architecture

Stores use a `countries` array to support multiple regions:

```typescript
{
  name: "Amazon",
  countries: ["ru", "es", "in"],
  languages: ["ru", "es", "en", "hi"]
}
```

Analytics are tracked separately per country to ensure:
- Amazon popular in Russia ≠ automatically popular in Spain
- Country-specific trending stores
- Accurate local market insights

## 📊 Analytics Strategy

Uses a hybrid approach:
1. **Manual Priority**: `popularIn` field for known global brands
2. **Auto-Priority**: View-based automatic tier assignment
3. **Smart Scheduling**: Update frequency based on traffic

## 🤖 AI Coupon Generation

The `coupon-scraper` service uses Google Gemini to generate localized coupons:

```typescript
// Generates 10-15 offers per store
// Deduplicates against existing offers
// Batches multiple stores to reduce API costs
```

## 🔧 Configuration

Each app has its own config:

```typescript
// apps/kuponly.ru/config/app.ts
export const APP_CONFIG = {
  country: "ru" as const,
  lang: "ru" as const,
  domain: "kuponly.ru",
  name: "Kuponly"
};
```

## 📝 Environment Variables

Required in `packages/ui/.env`:

```env
DATABASE_URL="mongodb+srv://..."
```

For coupon generation (optional):
```env
GEMINI_API_KEY="your-api-key"
```

## 🎨 UI Components

Shared components in `packages/ui/src/components/`:
- `SimilarStores`: Display related stores
- `TrendingCoupons`: Show trending offers
- `TrendingStoresWidget`: Homepage trending stores
- `VoteButtons`: Reddit-style voting

## 🚧 Roadmap

- [ ] Implement `trackStoreClick` tracking
- [ ] Add time-based trending (weekly/monthly)
- [ ] User authentication and saved offers
- [ ] Admin dashboard for store management
- [ ] API rate limiting and caching
- [ ] SEO optimizations

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the contributing guidelines first.

## 📧 Contact

For questions or suggestions, please open an issue.
