import { IMG1, IMG2 } from "./images";

export const products = [
  {
    id: 1,
    name: "Mango Milkshake 24g Protein Powder - Pack of 2 KG",
    imageUrl: IMG1,
    altText: "Mango Milkshake 24g Protein Powder",
    price: "₹7,544",
    originalPrice: "₹8,998",
    discount: "16% OFF",
    description:
      "Tastes like mom's homemade mango milkshake! Not overly sweet and packed with 24g of protein.",
    badge: "Special Edition",
    bgColor: "#046A38",
    selectOptions: [
      { value: "2kg", label: "Pack of 2 KG" },
      { value: "1kg", label: "Pack of 1 KG" },
    ],
    rating: 4,
  },
  {
    id: 2,
    name: "Unflavoured 30g Pure Whey Protein Isolate - Pack of 1 KG",
    imageUrl: IMG1,
    altText: "Unflavoured 30g Pure Whey Protein Isolate",
    price: "₹3,701",
    originalPrice: "₹3,999",
    discount: "7% OFF",
    description:
      "At 90% protein concentration, this is the purest form of whey protein isolate. Perfect for those who want maximum protein without any flavorings.",
    badge: "best seller",
    bgColor: "#4b0082",
    selectOptions: [
      { value: "1kg", label: "Pack of 1 KG" },
      { value: "2kg", label: "Pack of 2 KG" },
    ],
    rating: 5,
  },
  {
    id: 3,
    name: "Double Cocoa Protein Bars - Box of 8",
    imageUrl: IMG1,
    altText: "Double Cocoa Protein Bars",
    price: "₹800",
    originalPrice: "",
    discount: "",
    description:
      "Dark, fudgy chocolate topped with crisp roasted almonds. A perfect snack with 12g of protein per bar.",
    badge: "Bestseller",
    bgColor: "#dc8a20",
    selectOptions: [],
    rating: 4,
  },
  {
    id: 4,
    name: "Vanilla Almond Whey Protein Powder - 1 KG",
    imageUrl: IMG2,
    altText: "Vanilla Almond Whey Protein Powder",
    price: "₹5,299",
    originalPrice: "₹6,299",
    discount: "16% OFF",
    description:
      "Smooth vanilla flavor with a hint of almond. Packed with 24g of protein per serving. Ideal for shakes and smoothies.",
    badge: "",
    bgColor: "#DF3FAF",
    selectOptions: [
      { value: "1kg", label: "Pack of 1 KG" },
      { value: "2kg", label: "Pack of 2 KG" },
    ],
    rating: 5,
  },
  {
    id: 5,
    name: "CRUNCHY- Unsweetened Protein Peanut Butter - 500g",
    imageUrl: IMG2,
    altText: "CRUNCHY- Unsweetened Protein Peanut Butter",
    price: "₹625",
    originalPrice: "₹750",
    discount: "17% OFF",
    description:
      "Peanuts have never tasted this good. Whey protein-infused peanut butter with a crunchy texture and no added sugar.",
    badge: "Bestseller",
    bgColor: "#491C2E",
    selectOptions: [],
    rating: 4,
  },
];
