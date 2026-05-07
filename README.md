# Mortgage Snapshot

As a mortgage advisor, I witnessed how first-time buyers often struggle to understand how their monthly payments are allocated between interest and capital over the life of their mortgage. I found existing tools didn't provide clear visualisations of this breakdown, making it difficult to explain during consultations. So I've created it myself.

## Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Charts**: Chart.js 
- **Testing**: Jest 
- **Build**: Vite 7

## Key Features

- **The Inflection Point**: Visualize the year when your annual capital payments finally exceed annual interest payments - the turning point where you start paying down your loan faster than paying the bank
- **The Milestone**: Discover when your cumulative capital repaid overtakes total interest paid - the moment you've paid yourself more than the bank
- **Interactive Charts**: Annual and cumulative breakdowns showing the exact split between interest and capital over your mortgage term
- **Amortisation Schedule**: Year-by-year table of payments, remaining balance, and running totals
- **Input Validation**: Real-time error handling prevents invalid entries (negative values, unrealistic rates, excessive terms)

## Testing Strategy

- **30 unit tests** with 97% coverage on business logic
- **Edge case validation** (negative values, boundary conditions, upper limits)
- **Separation of concerns** - all calculations isolated and testable
- **Type safety** - TypeScript strict mode enabled throughout

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── InflectionPointChart.tsx
│   ├── MilestoneChart.tsx
│   └── MortgageTable.tsx
├── pages/              # Page components
│   └── HomePage.tsx
├── utils/              # Business logic and utilities
│   ├── mortgageCalculations.ts
│   ├── validation.ts
│   └── format.ts
├── __tests__/          # Unit tests
│   ├── mortgageCalculations.test.ts
│   ├── validation.test.ts
│   └── format.test.ts
└── App.tsx             # Router and app shell
```

## Live Deployment

- **Live Application**: www.mortgagesnapshot.co.uk
- **Hosting**: Vercel with custom domain
- **Status**: Production-ready with automated deployments

## Installation

```bash
# Clone the repository
git clone https://github.com/doowmot/mortgage-snapshot.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```
