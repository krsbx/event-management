import {
  UserSignInSchema,
  UserSignUpSchema,
} from "../validations/auth.validations";
import { axios } from "./axios.api";

export async function signInUser(payload: UserSignInSchema) {
  const { data } = await axios.post<{ token: string }>("/auth/signin", payload);

  return data;
}

export async function signUpUser(payload: UserSignUpSchema) {
  const { data } = await axios.post<{ id: string }>("/auth/signup", payload);

  return data;
}
