import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" })
    .refine((value) => !/\s/.test(value), {
      message: "Username cannot contain spaces",
    })
    .refine((value) => /^[a-z][a-z0-9_]*$/i.test(value), {
      message:
        "Username must start with a letter and can only contain underscore symbol.",
    }),
  firstname: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be at most 20 characters" })
    .refine((value) => /^[a-zA-Z0-9 ]+$/i.test(value), {
      message: "Name can only contain alphabets, numbers and spaces",
    }),

  lastname: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(20, { message: "Name must be at most 20 characters" })
    .refine((value) => /^[a-zA-Z0-9 ]+$/i.test(value), {
      message: "Name can only contain alphabets, numbers and spaces",
    }),

  email: z.string().email({ message: "Invalid email address" }),
  isEmailVerified: z.boolean(),
  loginMethod: z.enum(["EMAIL", "GOOGLE"]),
  gender: z.enum(["F", "M", "O"]),
  age: z.coerce.number().min(18).max(100),
  country: z.string(),
  avatar: z.string(),
  role: z.enum(["EDITOR", "ADMIN", "USER"]),
});
