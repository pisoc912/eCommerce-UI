export interface OrderDetail {
  orderId: number;
  orderNumber: number;
  orderDate: Date;
  orderStatus: String;
  orderTotalPrice:number;
  products: OrderedProductDetail[];
}

export interface OrderedProductDetail {
  productId: number;
  productName: string;
  productCategory:string;
  quantity: number;
  productPrice: number;
  productImg: string;
}
