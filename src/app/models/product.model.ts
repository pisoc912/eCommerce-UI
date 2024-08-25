export interface Product {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  description: string;
  imageUrl: string;
  isInCart: boolean;
  isLiked: boolean;
}
