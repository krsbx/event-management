# Event Management Backend Services

## Overview

Event Management Backend Services are developed using [@busy-hour/blaze](https://github.com/busy-hour/blaze) for the sake of scalability and maintainability. Since it allow us to develop the server into a Event Driven architecture.

The database that we use are MongoDB especially the docker image one and integrated with mongoose.

## Getting Started

To get started with the backend services, please follow the steps below:

1. Clone the repository from [GitHub](https://github.com/krsbx/event-management).

```bash
git clone git@github.com:krsbx/event-management.git
```

2. Run the following command to install the dependencies:

```bash
pnpm install # or npm install, we recommend to use pnpm
```

3. Setup the `.env` file in the project root and in the `projects/backend`.

> Keep in mind that both `.env` variables in the root and `projects/backend` must be in sync.

4. Setup the `mongodb` and `mongo-express` using the `docker-compose.yml` file in the project root.

```bash
docker compose --env-file .env up -d
```

> Note: Make sure to run the `docker compose --env-file .env up -d` command in the project root.

5. Run the following command to start the server in the `projects/backend` directory:

```bash
pnpm run dev # or npm run dev, we recommend to use pnpm
```

## Thought Process

For more detail regarding the thought process of the solutions, please refer to the [THOUGHT-PROCESS.MD](./docs/THOUGHT-PROCESS.MD).

## System Design

For more detail regarding the system design, please refer to the [SYSTEM-DESIGN.MD](./docs/SYSTEM-DESIGN.MD).

## Dependencies

The backend services are developed using the following libraries:

- [@busy-hour/blaze](https://github.com/busy-hour/blaze)

  > The [hono](https://github.com/honojs/hono) meta framework for handling the RESTful API and connections between each services (e.g. users service/routes comunicate with auth service/routes).

- [@hono/node-server](https://github.com/honojs/hono)

  > The adapter for [@busy-hour/blaze](https://github.com/busy-hour/blaze) and [hono](https://github.com/honojs/hono) so it can be run as a Node.js server.

- [@hono/swagger-ui](https://github.com/honojs/hono)

  > The adapter for creating Swagger UI for the API automatically.

- [zod](https://github.com/colinhacks/zod)

  > The type-safety schema validation library.

- [dotenv](https://github.com/motdotla/dotenv)

  > The environment variable loader.

- [mongoose](https://github.com/Automattic/mongoose)

  > The MongoDB driver for Node.js.

- [bcrypt](https://github.com/kelektiv/node.bcrypt)

  > The password hashing algorithm.

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

  > The JSON Web Token utility for Node.js.

- [lodash](https://github.com/lodash/lodash)

  > The utility library for JavaScript.

- [dayjs](https://github.com/iamkun/dayjs)

  > The date library for JavaScript.
