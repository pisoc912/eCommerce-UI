import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderDetail } from 'src/app/models/order-details.model';
import { Order } from 'src/app/models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private orderUrl = environment.apiUrl + '/api/order';
  constructor(private http: HttpClient) {}

  createOrderFromCart(cartId: number): Observable<Order> {
    return this.http.post<Order>(`${this.orderUrl}`, cartId);
  }

  createOrderFromSelectedItems(cartId: number,selectedProductIds:number[]): Observable<Order> {
    return this.http.post<Order>(`${this.orderUrl}/checkout/selected?cartId=${cartId}`, selectedProductIds);
  }

  cancelOrder(orderId: number): Observable<void> {
    return this.http.put<void>(`${this.orderUrl}/cancel/${orderId}`, {});
  }

  reorder(orderId: number): Observable<Order> {
    return this.http.post<Order>(`${this.orderUrl}/reorder/${orderId}`, {});
  }

  getOrderByUserId(userId: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.orderUrl}/userId/${userId}`);
  }

  getOrderByOrderId(orderId: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.orderUrl}/orderId/${orderId}`);
  }
}
