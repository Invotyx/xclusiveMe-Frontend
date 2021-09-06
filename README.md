# Xclusiveme Frontend

## Requirements

1. NodeJS 14+

## Setup

Clone repository and copy `.env.local.example` to `.env.local`
Install dependencies `npm install` or `yarn install`

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Run in Docker

```bash
# To build docker image
docker build -t xclusiveme-frontend $(cat .env | sed 's@^@--build-arg @g' | paste -s -d " ") .

# To run docker container
docker run -it --rm -p <port>:<port> xclusiveme-frontend
```
