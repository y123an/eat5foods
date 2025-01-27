import axios from "axios";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import bcrypt from "bcryptjs";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function randomPassword() {
  return Math.random().toString(36).slice(-8);
}

// Function to hash the password
export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export const discountedPrice = (price: number, discount: number) => {
  const discountPercentage = discount / 100;
  const discountedPrice = price - price * discountPercentage;
  return discountedPrice;
};

// name to color convertor
export function nameToColor(name: string): string {
  const colors: { [key: string]: string } = {
    black: "#000000",
    white: "#FFFFFF",
    red: "#FF0000",
    green: "#00FF00",
    blue: "#0000FF",
    yellow: "#FFFF00",
    cyan: "#00FFFF",
    magenta: "#FF00FF",
    orange: "#FFA500",
    purple: "#800080",
    pink: "#FFC0CB",
    brown: "#A52A2A",
    grey: "#808080",
    lightgrey: "#D3D3D3",
    darkgrey: "#A9A9A9",
    navy: "#000080",
    teal: "#008080",
    olive: "#808000",
    maroon: "#800000",
    lime: "#00FF00",
  };
  return colors[name.toLowerCase().trim()] || "Color not found";
}

export const getRandomColor = () => {
  const colors = [
    "bg-pink-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-purple-100",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export async function getPlaceName(latitude: string, longitude: string) {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = response.data;
    return data.display_name;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export const SUPABASE_FOLDER_URL =
  "https://dtelytpyqrhubxbbluph.supabase.co/storage/v1/object/public/Eat5Foods/";
