import { uploadFileToSupabase } from "@/lib/helpers/file-upload";
import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  console.log(JSON.stringify(formData, null, 2));
  try {
    // Extract and validate files
    const images = formData.getAll("images");
    if (images.length === 0) {
      return NextResponse.json(
        { message: "No files received in the request." },
        { status: 400 }
      );
    }

    // Upload each image file and collect URLs
    const uploadedImageUrls: string[] = [];
    for (const file of images) {
      // Check if the file is a valid Blob/File object with a name property
      if (file && typeof file === 'object' && 'name' in file) {
        const url = await uploadFileToSupabase(file);
        if (url) uploadedImageUrls.push(url);
      } else {
        console.error("Invalid file object:", file);
        throw new Error("Invalid file object");
      }
    }

    if (uploadedImageUrls.length === 0) {
      return NextResponse.json(
        { message: "File upload failed or no URLs were generated." },
        { status: 500 }
      );
    }

    // Parse JSON fields from formData with error handling
    const parseJsonField = (fieldName: string) => {
      try {
        return JSON.parse(formData.get(fieldName) as string);
      } catch (error) {
        throw new Error(`Invalid JSON in ${fieldName}`);
      }
    };

    const nutritionalFacts = parseJsonField("nutritionalFacts");
    const ingredients = parseJsonField("ingredients");
    const nonIngredients = parseJsonField("nonIngredients");
    const hasVariations = formData.get("hasVariations") === "true";
    const variations = hasVariations ? parseJsonField("productVariation") : [];

    // Validate required fields
    const requiredFields = [
      "name",
      "price",
      "quantity",
      "categoryId",
      "description",
    ];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Initialize product data object
    const productData = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      quantity: parseInt(formData.get("quantity") as string),
      categoryId: formData.get("categoryId") as string,
      description: formData.get("description") as string,
      discount: parseInt(formData.get("discount") as string) || 0,
      images: uploadedImageUrls,
      nutritionalFacts,
      ingredients,
      nonIngredients,
      hasVariations,
      productVariation: variations,
    };

    // Create product in the database
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        quantity: productData.quantity,
        price: productData.price,
        categoryId: productData.categoryId,
        discount: productData.discount,
        hasVariations: productData.hasVariations,
        image: {
          create: productData.images.map((url) => ({ url })),
        },
        nutritionalFacts: {
          create: productData.nutritionalFacts.map((fact: any) => ({
            name: fact.name,
            value: fact.value,
            unit: fact.unit,
          })),
        },
        ingredients: {
          create: productData.ingredients.map((ingredient: any) => ({
            name: ingredient.name,
            imageUrl: ingredient.imageUrl,
          })),
        },
        nonIngredient: {
          create: productData.nonIngredients.map((nonIngredient: any) => ({
            name: nonIngredient.name,
            imageUrl: nonIngredient.imageUrl,
          })),
        },
        productVariation: productData.hasVariations
          ? {
              create: productData.productVariation.map((variation: any) => ({
                price: variation.price,
                stock: variation.stock,
                sku: variation.sku,
              })),
            }
          : undefined,
      },
    });

    return NextResponse.json(
      { message: "Product created successfully", product },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create product:", error);
    return NextResponse.json(
      { message: `Failed to create product: ${(error as Error).message}` },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        image: true,              // Correct relation name
        nutritionalFacts: true,   // Correct relation name
        ingredients: true,        // Correct relation name
        nonIngredient: true,      // Matches the singular relation name in schema
        productVariation: true,   // Correct relation name
      },
    });
    

    return NextResponse.json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { success: false, error: "Error fetching products" },
      { status: 500 }
    );
  }
}
