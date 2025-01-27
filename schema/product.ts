import { string, z } from "zod";

const nutritionalFactSchema = z.object({
  name: z.string().min(1, "Nutritional fact name is required"),
  value: z.string().min(1, "Value is required"),
  unit: z.string().min(1, "Unit is required"),
});

const ingredientSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  imageUrl: z.string().url("Must be a valid URL"),
});

// Updated schema to include images array
export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  price: z.coerce
    .number()
    .min(0, "Price must be a positive number")
    .nonnegative(),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1").int(),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  discount: z.coerce.number().min(0, "discount can not be negative").int(),
  images: z.array(z.any()).optional(),
  nutritionalFacts: z.array(nutritionalFactSchema),
  ingredients: z.array(ingredientSchema),
  nonIngredients: z.array(ingredientSchema),
  hasVariations: z.boolean().default(false),

  productVariation: z
    .array(
      z.object({
        price: z.number(),
        stock: z.number(),
        sku: z.string().optional(),
      })
    )
    .optional(),
});

export type ProductType = z.infer<typeof ProductSchema>;
