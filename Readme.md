# Cat Breeds (GraphQL API and FE App)

## [Check out deployed app: Cat API](https://meow.ponasasilas.com)

# Start locally

```
# 1. Use NodeJS 10+
# 2. Make sure you have mongod in the background
sudo mongod

# Run production-ready build
npm i
npm start

# Run in development
npm i
npm start dev
```

## Description of the app

An app where user can see list of cat breeds.

-   ✅ List items should include breed name, description, temperament and origin.
-   ✅ User can filter cat list based on origin and search by name.
-   ✅ User fetches required data from Cat API

## Set requirements

-   ✅ Pleasing and ✅ responsive UI.
-   ✅ Clear API URL endpoints.
    -   /api/graphql
-   Accessibility/Security.
    -   ✅ Used chrome extension SiteImprove to find accesibility issues
    -   Security: - ✅ mongo runs locally on the server, ports closed, root access forbidden - ✅ app is behind CF - Would add similar checks if I had any sensitive gq queries/mutations: https://blog.websecurify.com/2014/08/hacking-nodejs-and-mongodb.html
-   Clean code, component based structure and best coding practices in use.
-   Good data structure.
-   Attention to detail.
-   Ability to discuss and argue the solutions.
