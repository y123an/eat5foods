export interface FormattedProduct {
  id: string;
  name: string;
  imageUrl: string;
  altText: string;
  price: number;
  discount?: number;
  description: string;
  badge: string;
  rating: number;
  backgroundColor?: string;
  variation?: {
    price: number;
    stock: number;
    sku: string;
  };
  variationId?: string;
}