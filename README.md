# Prompt Recommendation Engine

This is a Next.js project that provides an AI-powered prompt recommendation engine based on OpenAI API.

## Approach

- The recommendation engine takes your input prompt and uses OpenAI's API to generate optimized prompt suggestions.
- It scores and ranks these prompts based on relevance, search volume estimation, and buyer intent.
- The app is built using Next.js (app router), React components, and integrates with OpenAI's API for generation.

## Trade-offs and Stubs

- For demonstration, some features like search volume and buyer intent scores are stubbed or simplified.
- The app currently focuses on the core recommendation flow and UI; advanced filtering or user profiles are future work.
- API keys and environment variables are required and should be set in `.env.local`.

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
# or
pnpm install
pnpm dev
# or
bun install
bun dev
Open http://localhost:3000 in your browser to see the app.

You can start editing the main page by modifying app/page.tsx. The page reloads automatically on changes.

Tech Stack
Next.js (React + Server Components)

Tailwind CSS for styling

OpenAI API for prompt optimization

Custom UI components in components/ui

Learn More
Next.js Documentation

Learn Next.js

OpenAI API docs

Deployment
The easiest way to deploy this app is using Vercel.

See Next.js deployment documentation for details.