import { createClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { getCurrentUser } from "./current-user";
import { deleteUserAvatarFromSupabase } from "./helpers/file-upload";
import { SUPABASE_FOLDER_URL } from "./utils";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

export const uploadFile = async (file: File) => {
  const user = await getCurrentUser();

  if (user?.image) {
    await deleteUserAvatarFromSupabase(user.image);
  }

  const filename = `avatar-${uuidv4()}`;
  try {
    const { data, error } = await supabaseClient.storage
      .from("Eat5Foods/users")
      .upload(`${filename}`, file);

    if (error) return { error: "Unexpected error occurred during upload" };
    return { url: `${SUPABASE_FOLDER_URL}/users/${data.path}` };
  } catch (error) {
    throw new Error("Unable to upload product image");
  }
};
