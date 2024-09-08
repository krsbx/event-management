# Event Management Backend Thought Process

## Introduction

The backend project is a high-level project that focuses on the development of the server. The goal of the project is to build the server into an event driven architecture.

## Motivation

The motivation for the backend project is to build the server into an event driven architecture. This will allow for the server to be easily scaled and managed by the team.

## Database

For the database related, please refer to the [SYSTEM-DESIGN.MD](./SYSTEM-DESIGN.MD#database-design).

## Architecture

The architecture of the backend project is as follows:

- Server

  - Services

    - Core

      - Actions

        - $hashText : Responsible for hashing the text using bcrypt, useful for password hashing.

        - $compareText : Responsible for comparing the text using bcrypt, useful for password verification.
        - $verifyJwt : Responsible for verifying the JWT token, useful for verifying the user JWT Token for authentication.

        - $signJwt : Responsible for signing the JWT token, useful for creating the user JWT Token for authentication.

    - Auth

      - Actions

        - signUp : **[REST API]** Responsible for signing up the user.

        - signIn : **[REST API]** Responsible for signing in the user.

    - Available Events

      - Actions

        - $create : **[Internal Call]** Responsible for creating an available event, if it's required to allow of creation of an available event/list of available events through REST API, we just need to call this action from the REST API actions.

        - $update : **[Internal Call]** Responsible for updating an available event, if it's required to allow of updating one or many available events through REST API, we just need to call this action from the REST API actions.

        - $delete : **[Internal Call]** Responsible for deleting an available event, if it's required to allow of deletion of an available event/list of available events through REST API, we just need to call this action from the REST API actions.

        - $find : **[Internal Call]** Responsible for finding an available event, if it's required to allow of finding one or many available events through REST API, we just need to call this action from the REST API actions.

        - $list : **[Internal Call]** Responsible for listing events, the `available-event.list` REST API action is calling this action internally to list available events.

        - $list : **[REST API]** Responsible for listing events.

      - Validations : Contains the validations schemas for the available events actions.

    - Events

      - Actions

        - $create : **[Internal Call]** Responsible for creating an event, the `event.create` REST API action is calling this action internally to create an event.

        - $update: **[Internal Call]** Responsible for updating an event, the `event.update` REST API action is calling this action internally to update an event.

        - $delete: **[Internal Call]** Responsible for deleting an event, if it's required to allow the user to delete their event through REST API, we just need to call this action from the REST API actions.

        - $find: **[Internal Call]** Responsible for finding an event, the `event.find` REST API action is calling this action internally to find an event.

        - $list: **[Internal Call]** Responsible for listing events, the `event.list` REST API action is calling this action internally to list events.

        - create : **[REST API]** Responsible for creating an event.

        - update : **[REST API]** Responsible for updating an event.

        - find : **[REST API]** Responsible for finding an event.

        - list : **[REST API]** Responsible for listing events.

      - Validations : Contains the validations schemas for the events actions.

    - Users

      - Actions

        - $create : **[Internal Call]** Responsible for creating a user, the `auth.signup` REST API action is calling this action internally to create a user.

        - $update: **[Internal Call]** Responsible for updating a user, if its' required to allow of updating one or many users through REST API, we just need to call this action from the REST API actions.

        - $delete: **[Internal Call]** Responsible for deleting a user, if its' required to allow of updating one or many users through REST API, we just need to call this action from the REST API actions.

        - $find: **[Internal Call]** Responsible for finding a user, the `auth.signup` and `auth.signin` REST API action is calling this action internally to find a user.

        - $list: **[Internal Call]** Responsible for listing users, the `user.list` REST API action is calling this action internally to list users.

        - list : **[REST API]** Responsible for listing users.

      - Validations : Contains the validations schemas for the users actions.
