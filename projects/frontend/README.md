# Event Management Frontend Services

## Overview

Event Management Frontend Service are developed using [react](https://reactjs.org/) as the framework, [tailwind](https://tailwindcss.com/) as the CSS framework, [Vite](https://vitejs.dev/) as the bundler and [zustand](https://github.com/pmndrs/zustand) as the state management library.

The connection between the frontend and the backend is done using [axios](https://github.com/axios/axios) and the page routes are defined in the `src/pages` directory by using the [@generouted/react-router](https://github.com/generouted/react-router) as the main router library.

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

3. Setup the `.env` file in the project root and in the `projects/frontend`.

> Keep in mind that you need to update the `.env` variables with the correct values from the backend service.

4. Run the following command to start the server in the `projects/frontend` directory:

```bash
pnpm run dev # or npm run dev, we recommend to use pnpm
```

5. Open the [localhost:5173](http://localhost:5173) in your browser.

## Dependencies

The backend services are developed using the following libraries:

- [react](https://reactjs.org/)

  > As the framework

- [tailwind](https://tailwindcss.com/)

  > As the CSS framework

- [Vite](https://vitejs.dev/)

  > As the bundler

- [zustand](https://github.com/pmndrs/zustand)

  > As the state management library

- [axios](https://github.com/axios/axios)

  > As the http client library

- [@generouted/react-router](https://github.com/generouted/react-router)

  > As the main router library

- [zod](https://github.com/colinhacks/zod)

  > As the type-safety schema validation library.

- [formik](https://github.com/formium/formik)

  > As the form validation library.

- [lodash-es](https://github.com/lodash/lodash)

  > As the utility library.

- [dayjs](https://github.com/iamkun/dayjs)

  > As the date library for JavaScript.

- [jwt-decode](https://github.com/auth0/jwt-decode)

  > As the JWT decoder library.
