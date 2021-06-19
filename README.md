# pixar

Vue 2 app that implements film catalog discovery using the Movie DB API

## Build

Use [Node 14 <abbr>LTS</abbr>](https://nodejs.org/).

  1. `npm i` to install deps
  2. `npm run start:dev` to start dev server with HMR at `localhost:8000`

You can also use `npm start` to start dev server without HMR

- `npm run build:dev` (or `npm run watch`) to build for development
- `npm run build` to build for production

To build the GraphQL data graph locally, see [`melhosseiny/pixar-data-graph`](https://github.com/melhosseiny/pixar-data-graph).

## Test/Lint

- `npm run test` to run Jest
- `npm run eslint` to run ESLint
- `npm run stylelint` to run stylelint

## Note on dependencies

The client app depends on two packages published on the Github Container Registry:

  - [`@melhosseiny/aurora`](https://github.com/melhosseiny/aurora)
  - [`@melhosseiny/vue-aurora`](https://github.com/melhosseiny/vue-aurora)

Since these packages are not on NPM, a personal access token with `read:packages` scope included in a `.npmrc` file is required to install them.

    //npm.pkg.github.com/:_authToken=TOKEN
    registry=https://npm.pkg.github.com/melhosseiny
