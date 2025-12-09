# AI Coupon Scraper Service

This service automatically generates coupons for stores using Google Gemini AI. It runs on a schedule and intelligently determines which stores need updates based on popularity, traffic, and "new store" status.

## 🚀 Features

- **Smart Scheduling**: Updates popular stores frequently (7 days) and low-traffic stores rarely (30 days).
- **New Store Boost**: Automatically gives new stores (<90 days) a 14-day update cycle to help them rank.
- **Dynamic Thresholds**: Determines "High Traffic" based on actual country-specific view data (Top 10%).
- **Batch Processing**: Groups stores by country/language and generates offers in batches to save API costs.
- **Deduplication**: Checks existing offers before adding new ones.

## 🛠️ Setup

1.  Ensure `GEMINI_API_KEY` is set in your `.env` file.
2.  Install dependencies:
    ```bash
    pnpm install
    ```

## 🏃‍♂️ Running

### Development Mode
```bash
pnpm dev
```

### Production
```bash
pnpm start
```

## 🔄 How it Works

1.  **Cycle Start**: Runs every 6 hours (defined in `src/index.ts`).
2.  **Grouping**: Fetches all stores and groups them by `Country-Language` pairs (e.g., `ru-ru`, `es-en`).
3.  **Filtering**: Checks each store against the `GenerationLog` to see if an update is due.
    *   Uses `determinePopularityTag` to find the correct schedule (Popular, Views, Category, Mid, Low).
4.  **Generation**: Sends batches of 5 stores to Gemini API.
5.  **Saving**: Saves new unique offers to MongoDB and logs the generation event.
