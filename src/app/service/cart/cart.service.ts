import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemCnt = new BehaviorSubject<number>(0);
  private apiUrl = environment.apiUrl + '/api/carts';

  constructor(private http: HttpClient) {}

  getCartByUserId(userId: number): Observable<Cart> {
    return this.http
      .get<Cart>(`${this.apiUrl}/user/${userId}`)
      .pipe(
        tap((cart) => this.updateCartItemCount(this.calculateTotalItems(cart)))
      );
  }

  addItemToCart(
    userId: number,
    productId: number,
    productName: string,
    quantity: number,
    unitPrice: number
  ): Observable<Cart> {
    return this.http
      .post<Cart>(`${this.apiUrl}/${userId}/items`, {
        productId,
        productName,
        quantity,
        unitPrice,
      })
      .pipe(
        tap((cart) => this.updateCartItemCount(this.calculateTotalItems(cart)))
      );
  }

  updateItemQuantity(
    cartId: number,
    productId: number,
    quantity: number
  ): Observable<Cart> {
    return this.http
      .put<Cart>(`${this.apiUrl}/${cartId}/items/${productId}`, quantity)
      .pipe(
        tap((cart) => this.updateCartItemCount(this.calculateTotalItems(cart)))
      );
  }

  removeItemFromCart(cartId: number, productId: number): Observable<string> {
    return this.http
      .delete(`${this.apiUrl}/${cartId}/items/${productId}`, {
        responseType: 'text',
      })
      .pipe(
        tap((response) => {
          console.log('response',response);
        })
      );
  }

  clearCart(cartId: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${cartId}/clear`)
      .pipe(tap(() => this.updateCartItemCount(0)));
  }

  updateCartItemCount(count: number): void {
    this.cartItemCnt.next(count);
  }

  getCartItemCount(): Observable<number> {
    return this.cartItemCnt.asObservable();
  }

  private calculateTotalItems(cart: Cart): number {
    return cart.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
