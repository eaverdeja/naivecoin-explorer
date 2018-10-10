# Naivecoin Exlorer

### A frontend app made with React + Apollo Client for exploring the [naivecoin blockchain](https://github.com/eaverdeja/naivecoin-cqg)

---

_Note: This is still a work in progress!_

---

This app makes interacting with the GraphQL API exposed by naivecoin possible by using Apollo Client for the communication and Material UI for the looks.

### Features

- Dashboard with latest blocks, unconfirmed transactions and a JSON blockchain view
- Creating wallets and addresses
- Sending and visualizing transactions
- Mining blocks
- Realtime server log output, making all desired core processing and p2p communication underlying the app visible on the client side

### Setup

This app uses docker for it's workflow. Seeing as it needs a backend app running the naivecoin blockchain, containers seemed a nice solution for having a nice dev experience.

The project's `Dockerfile` must be built and used as an image on the [backend project's](https://github.com/eaverdeja/naivecoin-cqg) `docker-compose`
