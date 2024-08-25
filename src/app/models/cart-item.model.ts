import { Product } from "./product.model";

export interface CartItem {
  id: number;
  productId:number;
  productName: Product;
  quantity: number;
  unitPrice: number;
  imageUrl:string;
}
