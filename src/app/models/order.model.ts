import { OrderItem } from "./order-item.model";

export interface Order {
  orderId: number;
  orderStatusEnum: string;
  orderNumber: string;
  orderDate: Date;
  customerId: number;
  totalPrice:number;
  orderItems: OrderItem[];
}
