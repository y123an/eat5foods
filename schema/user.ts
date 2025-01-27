import * as z from "zod";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string({ required_error: "Email address is required" })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "The password must be at least 8 characters long")
    .max(32, "The password must be a maximum 32 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
      "password must contain Uppercase, lowercase, symbol and number  "
    ),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(
      /^(09|07|\+2519)\d{8}$|^(\+91|91)?[7-9]\d{9}$/,
      "Invalid phone number format. Please enter a valid Ethiopian | Indian phone number "
    ),
  image: z.string().optional(),
});

export type userSchemaType = z.infer<typeof userSchema>;
