import { IUser, RestListResponse } from "../types/api";
import { axios } from "./axios.api";

export async function listUsers(query: { limit: number; offset: number }) {
  const { data } = await axios.get<RestListResponse<IUser>>("/users", {
    params: query,
  });

  return data;
}
