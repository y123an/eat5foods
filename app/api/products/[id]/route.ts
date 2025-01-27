import { getCurrentUser } from "@/lib/current-user";
import {
  uploadFileToSupabase,
  deleteFileFromSupabase,
} from "@/lib/helpers/file-upload";
import { prisma } from "@/lib/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: any) {
  const productId = params.id;
  const formData = await request.formData();
  try {
    // Fetch existing product data
    const existingProduct = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        image: true,
        nutritionalFacts: true,
        ingredients: true,
        nonIngredient: true,
        productVariation: true,
      },
    });

    if (!existingProduct) {
      throw new Error("Product not found.");
    }

    // Extract and validate files
    const images = formData.getAll("images");
    
    // Upload images if provided
    const uploadedImageUrls: string[] = [];
    if (images.length > 0) {
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
    }

    const existingImageURLs = JSON.parse(
      formData.get("existingImageURLs") as string
    );

    const combinedImageUrls = [...existingImageURLs, ...uploadedImageUrls];
    const uniqueImageUrls = Array.from(new Set(combinedImageUrls));

    // Parse JSON fields from formData
    const nutritionalFacts = JSON.parse(
      formData.get("nutritionalFacts") as string
    );
    const ingredients = JSON.parse(formData.get("ingredients") as string);
    const nonIngredients = JSON.parse(formData.get("nonIngredients") as string);
    const variations = JSON.parse(formData.get("productVariation") as string);

    // Initialize product data object, preserving existing values
    const productData = {
      name: (formData.get("name") as string) || existingProduct.name,
      price:
        parseFloat(formData.get("price") as string) || existingProduct.price,
      quantity:
        parseInt(formData.get("quantity") as string) ||
        existingProduct.quantity,
      categoryId:
        (formData.get("categoryId") as string) || existingProduct.categoryId,
      description:
        (formData.get("description") as string) || existingProduct.description,
      discount:
        parseInt(formData.get("discount") as string) ||
        existingProduct.discount,
      hasVariations: formData.get("hasVariations") === "true",
      images: uniqueImageUrls,
      nutritionalFacts:
        nutritionalFacts.length > 0
          ? nutritionalFacts
          : existingProduct.nutritionalFacts,
      ingredients:
        ingredients.length > 0 ? ingredients : existingProduct.ingredients,
      nonIngredients:
        nonIngredients.length > 0
          ? nonIngredients
          : existingProduct.nonIngredient,
      variations:
        variations.length > 0 ? variations : existingProduct.productVariation,
    };

    // Determine which images to delete
    const imagesToDelete = existingProduct.image
      .filter((img) => !existingImageURLs.includes(img.url))
      .map((img) => img.url);

    // Delete removed images from Supabase
    for (const imageUrl of imagesToDelete) {
      await deleteFileFromSupabase(imageUrl);
    }

    // Update product in the database
    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        name: productData.name,
        description: productData.description,
        quantity: productData.quantity,
        price: productData.price,
        categoryId: productData.categoryId,
        discount: productData.discount,
        hasVariations: productData.hasVariations,
        image: {
          deleteMany: {},
          create: productData.images.map((url: string) => ({ url })),
        },
        nutritionalFacts: {
          deleteMany: {},
          create: productData.nutritionalFacts,
        },
        ingredients: {
          deleteMany: {},
          create: productData.ingredients,
        },
        nonIngredient: {
          deleteMany: {},
          create: productData.nonIngredients,
        },
        productVariation: {
          deleteMany: {},
          create: productData.variations,
        },
      },
    });

    return NextResponse.json(
      { message: "Product updated successfully", product },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to update product:", error);
    return NextResponse.json(
      { message: `Failed to update product: ${error}` },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized Admin only can do this!" },
      { status: 401 }
    );
  }

  try {
    // Fetch the product to get its images and related data
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        image: true,
        nutritionalFacts: true,
        ingredients: true,
        nonIngredient: true,
        productVariation: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Delete images from Supabase
    for (const image of product.image) {
      await deleteFileFromSupabase(image.url);
    }

    // Delete the product and its related data
    await prisma.$transaction([
      prisma.image.deleteMany({ where: { productId: params.id } }),
      prisma.nutritionalFact.deleteMany({ where: { productId: params.id } }),
      prisma.ingredient.deleteMany({ where: { productId: params.id } }),
      prisma.nonIngredient.deleteMany({ where: { productId: params.id } }),
      prisma.productVariation.deleteMany({ where: { productId: params.id } }),
      prisma.product.delete({ where: { id: params.id } }),
    ]);

    return NextResponse.json({
      message: "Product and its related data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { message: "Error deleting product and its related data" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") {
    return NextResponse.json(
      { message: "Unauthorized. Admin only can do this!" },
      { status: 401 }
    );
  }

  try {
    const { variationId } = await request.json();

    if (!variationId) {
      return NextResponse.json(
        { message: "Variation ID is required" },
        { status: 400 }
      );
    }

    // Delete the variation
    await prisma.productVariation.delete({
      where: { id: variationId },
    });

    return NextResponse.json({
      message: "Variation deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting variation:", error);
    return NextResponse.json(
      { message: "Error deleting variation" },
      { status: 500 }
    );
  }
}