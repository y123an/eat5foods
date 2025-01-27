import { z } from "zod";

export const accountSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(2, {
      message: "Name must be at least 2 characters.",
    }),
  email: z.string().email("Invalid email address"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .regex(
      /^(09|07|\+2519)\d{8}$|^(\+91|91)?[7-9]\d{9}$/,
      "Invalid phone number format. Please enter a valid Ethiopian | Indian phone number"
    ),
  role: z.enum(["ADMIN", "USER"]),
});
