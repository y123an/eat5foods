import { v4 as uuidv4 } from "uuid";
import { supabaseClient } from "../supabase";
import { SUPABASE_FOLDER_URL } from "../utils";

// Upload file to Supabase
export async function uploadFileToSupabase(file: File): Promise<string> {
  const filename = `product-image-${uuidv4()}`;
  const { data, error } = await supabaseClient.storage
    .from("Eat5Foods/products")
    .upload(`${filename}`, file);

  if (error) {
    console.error("Upload error:", error.message);
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  return `${SUPABASE_FOLDER_URL}/products/${data?.path}`;
}

// Delete file from Supabase
export async function deleteFileFromSupabase(fileUrl: string): Promise<void> {
  console.log("Deleting file...");

  const urlParts = fileUrl.split("/");
  const filename = urlParts[urlParts.length - 1];
  const { data, error } = await supabaseClient.storage
    .from("Eat5Foods")
    .remove([`products/${filename}`]);

  if (error) {
    console.error("Delete error:", error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }

  console.log("File deleted successfully");
}
export async function deleteUserAvatarFromSupabase(
  fileUrl: string
): Promise<void> {
  console.log("Deleting file...");

  const urlParts = fileUrl.split("/");
  const filename = urlParts[urlParts.length - 1];
  const { data, error } = await supabaseClient.storage
    .from("Eat5Foods")
    .remove([`users/${filename}`]);

  if (error) {
    console.error("Delete error:", error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }

  console.log("File deleted successfully");
}
