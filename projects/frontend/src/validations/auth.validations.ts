import { z } from "zod";
import { UserRoles } from "../utils/constants/services.constants";

export const userSignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type UserSignInSchema = z.infer<typeof userSignInSchema>;

export const userSignUpSchema = z.object({
  username: z.string(),
  password: z.string(),
  role: z.nativeEnum(UserRoles),
  companyName: z.string(),
});

export type UserSignUpSchema = z.infer<typeof userSignUpSchema>;
