// Generouted, changes to this file will be overriden
/* eslint-disable */

import { components, hooks, utils } from "@generouted/react-router/client";

export type Path = `/` | `/auth/signin` | `/auth/signup`;

export type Params = {};

export type ModalPath =
  | `/approve`
  | `/cancel`
  | `/create`
  | `/reject`
  | `/update`;

export const { Link, Navigate } = components<Path, Params>();
export const { useModals, useNavigate, useParams } = hooks<
  Path,
  Params,
  ModalPath
>();
export const { redirect } = utils<Path, Params>();
