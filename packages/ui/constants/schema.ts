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
		fullName: z
			.string()
			.min(3, { message: "Name must be at least 3 characters" })
			.max(20, { message: "Name must be at most 20 characters" })
			.refine((value) => /^[a-zA-Z0-9 ]+$/i.test(value), {
				message: "Name can only contain alphabets, numbers and spaces",
			}),
         email:z.string().email({message:"Invalid email address"})
	});

