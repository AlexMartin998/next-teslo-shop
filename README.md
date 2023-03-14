# TesloShop

This is a Next.js project bootstrapped with `pnpm create next-app --typescript`.

## Getting Started

### .env

Create `.env` file based on `.env.template`

### Run the development server with Docker 🐳 :

```bash
# install pnpm
npm i -g pnpm

# run docker contaniers
docker compose -f docker-compose.dev.yml up --build

# stop and remove containers & networks
docker compose -f docker-compose.dev.yml down

```

### Run the production server with Docker 🐳 :

```bash

# docker compose
docker compose up --build -d

```
