export type TCategory =
  | "Fiction"
  | "Science"
  | "SelfDevelopment"
  | "Poetry"
  | "Religious"
  | "Thriller";

export interface IProduct {
  id: string;
  title: string;
  author: string;
  price: number;
  category: TCategory;
  description: string;
  quantity: number;
  inStock: boolean;
  soldCount?: number;
  isBestSold?: boolean;
  hasOffer?: boolean;
  productImg?: string;
  language?: string;
  ratings?: number;
  totalPrice?: number;
  review?: [];
  offerRate?: number;
  rating?: number;
}
