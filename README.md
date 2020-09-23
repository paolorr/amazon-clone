# Amazon Clone

Amazon clone based on Clever Programmer's [tutorial](https://www.youtube.com/watch?v=_Z6eRoagmz4) using TypeScript and Styled Components instead of Javascript and pure CSS.

Check out [live demo](https://clone-dad00.web.app/) deployed at Firebase.

## Functionalities

- Add product to cart
- Remove product from cart
- View cart
- Increase/decrease product quantity on cart
- Sign in/up/out using Firebase authentication
- Checkout using Stripe
- View orders

## Run & Deploy

To run and deploy you sould have [Node.js 12.x](https://nodejs.org/) and [Yarn 1.x](https://classic.yarnpkg.com/) installed.

1. Install Firebase CLI

   `npm install -g firebase-tools`

2. Clone project

   `git clone https://github.com/paolorr/amazon-clone.git`

3. Open project folder

   `cd amazon-clone`

4. Install project dependencies

   `yarn && cd functions && yarn && cd ..`

5. Open [Firebase Console](https://console.firebase.google.com/) and create a project called amazon-clone
6. On Firebase project settings page (cog icon)

   1. Register a web app called amazon-clone (check the option 'Also set up Firebase Hosting for this app')
   2. Select General tab, scroll down to 'Firebase SDK snippet', select Config and copy the configuration

7. Open `src/firebase.ts` and replace the configuration
8. On Firebase project page
   1. Select Authentication and enable Email/Password Sign-in method
   2. Select Cloud Firestore and create a database in test mode
   3. Upgrade plan to Blaze to enable functions
9. Login to your Firebase account

   `firebase login`

10. Set Firebase default project
    1. `firebase use --add`
    2. Select the Project Id created on step 5
    3. Alias: default
11. Create `.env.development`

    `echo REACT_APP_API_URL=http://localhost:5001/<YOUR_FIREBASE_PROJECT_ID>/us-central1/api > .env.development`

12. Create `.env.production`

    `echo REACT_APP_API_URL=https://us-central1-<YOUR_FIREBASE_PROJECT_ID>.cloudfunctions.net/api > .env.production`

13. Create and account on [Stripe](https://stripe.com/) and copy the secret test key
14. Create `functions/.env.json`

    `cp functions/.env.example.json functions/.env.json`

15. Paste Stripe secret test key on `functions/.env.json`
16. Set and fetch Firebase environment configurations

    `cd functions && yarn config:setget && cd ..`

    (this creates `functions/.runtimeconfig.json`)

### Run locally

1. Terminal 1

   `yarn start`

2. Terminal 2

   `cd functions && yarn serve`

   (for live reload when changing functions run `cd functions && yarn watch` and `cd functions && yarn serve` on different terminals)

### Deploy to Firebase

1. `yarn build`
2. `firebase deploy`

### Testing Credit Cards

- Payment succeeds: 4242 4242 4242 4242
- Payment requires authentication: 4000 0025 0000 3155
- Payment is declined: 4000 0000 0000 9995
- [Other Testing Cards](https://stripe.com/docs/testing#cards)

## Tools & Technologies

- [Node.js](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/)
- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Hooks](https://reactjs.org/docs/hooks-intro.html)
- [Styled Components](https://styled-components.com/)
- [React Router DOM](https://reactrouter.com/)
- [React Context API](https://reactjs.org/docs/context.html)
- [Immer](https://immerjs.github.io/immer/docs/introduction) / [useImmer](https://github.com/immerjs/use-immer)
- [Firebase](https://firebase.google.com/) (Hosting, Firestore & Functions)
- [Stripe](https://stripe.com/)
- [Axios](https://github.com/axios/axios)
- [ESLint](https://eslint.org/) / [Prettier](https://prettier.io/)
