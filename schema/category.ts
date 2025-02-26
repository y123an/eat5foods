import { z } from "zod";

export const CategorySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  description: z.string().min(1, { message: "write category description." }),
  image: z.instanceof(File).optional(),
});


export const ReviewsRatingsSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  comment: z.string().min(1, { message: "write comment description." }),
  image: z.instanceof(File).optional(),
})
