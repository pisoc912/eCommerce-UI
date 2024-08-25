import { CartItem } from "./cart-item.model";

export interface Cart{
  id:number;
  cartItems:CartItem[];
  totalPrice:number;
  status:string;
}

