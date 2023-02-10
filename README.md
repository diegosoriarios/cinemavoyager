This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TODO
- [x] Create map with zoom and separate countries
- [x] Create a page with the list of movies from that country
- [x] Create pagination for the list of movies from country
- [x] Create a page with details about the movie
- [ ] Show list of where to watch
- [x] Create login page
- [x] Create create account page
- [x] Create forgot password page
- [x] Arrumar NavBar profile avatar
- [x] Create a list of want to watch page
- [x] Allow users to recomend a movie
- [ ] Create login flux
- [ ] Change Logo
- [ ] Change name
- [ ] Change favicon

### TODO SERVER
- [ ] Use [CockroachDB](https://cockroachlabs.cloud/signup) as server
- [ ] Create pagination on backend
- [ ] Create integration with justwatch or watch mode
- [ ] Allow to create an account to add to want to watch it
- [ ] Create forgot password flux
- [x] Create login
