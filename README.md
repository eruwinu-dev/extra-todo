# How to Build a Fullstack App with NextJS, Prisma, and MongoDB

## Set up your Next JS

`create-next-app <project> --ts --eslint --use-pnpm`

## Add experimental superjson features

-   `pnpm superjson next-superjson-plugin`
-   Update `next-config.js` to use SWC plugins

## Set up Prisma and connect to your MongoDB database

`pnpm add prisma`
`npx prisma init`

-   Add the MongoDB connection string to your .env file.

## Add schema.prisma and push

`npx prisma db push`

## Add Prisma Studio

`pnpm add @prisma/client`
`npx prisma studio`

## Add Next-Auth Google Authentication

`pnpm install next-auth@4 @next-auth/prisma-adapter`

-   Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and create an OAuth Client ID
    -   Set Authorized Javascript origins - https://localhost:3000
    -   Set Authorized redirect URIs: https://localhost:3000/api/auth/callback/google
-   Get GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXTAUTH_URL, NEXTAUTH_SECRET

## Add Next-Auth API

-   Create `[...nextauth].ts` file

### Important Functions

-   Use `next-auth/react` library for authentication. (`signIn, signOut, getSession`)
-   Use Prisma's built in types, do not create your own type definitions unless it's for context/client side components.

