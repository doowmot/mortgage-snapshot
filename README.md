# Mortgage Snapshot

As a mortgage advisor, I witnessed how first-time buyers often struggle to understand how their monthly payments are allocated between interest and capital over the life of their mortgage. I found existing tools didn't provide clear visualisations of this breakdown, making it difficult to explain during consultations. So I've created it myself.

## Tech Stack

- **Frontend**: React, JavaScript, Tailwind CSS 
- **Charts**: Chart.js 
- **Testing**: Jest 
- **Build**: Vite

## Key Features

- **Affordability Calculator:** Based on income multiples
- **Monthly Payment Calculator:** Calculate accurate monthly mortgage payments with support for different interest rates and mortgage terms
- **Visual charts** showing how interest vs. capital payments change over time 
- **Amortisation Schedule**: Year-by-year breakdown of payments and remaining balance
- **Stress Testing**: See how payments would change with a 3% interest rate increase

## Testing Strategy

- **37 unit tests** with 100% coverage on business logic
- **Edge case validation** (negative values, boundary conditions)
- **Separation of concerns** - all calculations isolated and testable
- **Input validation** with user-friendly error handling

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── AffordabilityForm.tsx
│   ├── CostsForm.tsx
│   └── MortgageTable.tsx
├── utils/              # Business logic and utilities
│   ├── mortgageCalculations.ts
│   ├── validation.ts
│   └── format.ts
├── __tests__/          # Unit tests
│   ├── mortgageCalculations.test.ts
│   ├── validation.test.ts
│   └── format.test.ts
└── App.tsx             # Main application component
```

## Future Improvements

- **TypeScript migration**: Add strict typing for improved maintainability
- **Component testing**: React Testing Library integration for UI testing
- **State management**: Implement Redux/Context for complex state scenarios
- **Data persistence**: Save calculations for comparison and analysis
- **API integration**: Connect to real-time interest rate feeds


## Live Deployment

- **Live Application**: www.mortgagesnapshot.co.uk
- **Hosting**: Vercel with custom domain
- **Status**: Production-ready with automated deployments

## Development Notes

- **Build System**: Vite configured for TypeScript support
- **Current Implementation**: JavaScript with plans for TypeScript migration
- **Rationale**: Rapid prototyping in JavaScript, with TypeScript conversion planned for production enhancement

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/mortgage-snapshot.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```
