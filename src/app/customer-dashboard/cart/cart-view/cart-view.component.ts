import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item.model';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { CartService } from 'src/app/service/cart/cart.service';
import { OrderService } from 'src/app/service/order/order.service';
import { ProductService } from 'src/app/service/product/product-service.service';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})
export class CartViewComponent implements OnInit {
  cart!: Cart;
  cartItem!: CartItem;
  selectedItems: { productId: number; selected: boolean }[] = [];
  totalPrice: number = 0;
  user:User | null = null;
  userId!: number;
  isEmptyCart: boolean = true;
  allSelected: boolean = false;
  isEdit: { [productId: number]: boolean } = {};
  products: Product[] = [];
  selectedTotalPrice: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private snackBar: MatSnackBar,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    this.user = userData ? JSON.parse(userData) : null;
    if(this.user){
      this.userId = this.user.id!;
    }
    if (this.userId === 0) {
      console.log('user is not logged in');
    } else {
      this.getCart();
    }
  }

  getCart(): void {
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (cart) => {
        if (cart && cart.cartItems && cart.cartItems.length > 0) {
          this.cart = cart;
          this.isEmptyCart = false;
          this.updateTotalPrice();
          this.selectedItems = cart.cartItems.map((item) => ({
            productId: item.productId,
            selected: false,
          }));
          console.log('Cart successfully loaded', cart);
        } else {
          // This block will run if the cart is technically returned but is empty
          this.isEmptyCart = true;
          console.log('Cart is empty');
        }
      },
      error: (error: HttpErrorResponse) => {
        this.isEmptyCart = true;
        console.error('Error fetching cart:', error.message);
        if (error.status === 404) {
          // Specific handling for not found error
          console.log('No cart found for user');
          console.log(this.isEmptyCart);
        } else {
          // Handling for other types of errors
          console.error('An unexpected error occurred:', error.statusText);
        }
      },
    });
  }

  updateTotalPrice(): void {
    if (this.cart) {
      this.totalPrice = this.cart.totalPrice;
    }
  }

  addItem(
    productId: number,
    productName: string,
    quantity: number,
    unitPrice: number
  ): void {
    this.cartService
      .addItemToCart(this.cart.id, productId, productName, quantity, unitPrice)
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  updateQuantity(cartItemId: number, quantity: number): void {
    this.cartService
      .updateItemQuantity(this.cart.id, cartItemId, quantity)
      .subscribe((cart) => {
        this.cart = cart;
      });
  }

  clearCart(): void {
    console.log('click clear');
    this.cartService.clearCart(this.userId).subscribe(() => {
      this.getCart();
    });
  }

  toggleSelection(productId: number, isSelected: boolean): void {
    const selectedItems = this.selectedItems.find(
      (item) => item.productId === productId
    );
    if (selectedItems) {
      selectedItems.selected = isSelected;
    }
    this.calculateSelectedTotalPrice();
    this.updateSelectAllState();
  }

  toggleSelectAll(isSelected: boolean): void {
    this.selectedItems.forEach((item) => (item.selected = isSelected));
    this.calculateSelectedTotalPrice();
  }

  toggleEdit(productId: number): void {
    this.isEdit[productId] = !this.isEdit[productId];
  }

  deleteItem(cartId:number,productId: number): void {
    console.log('delete', productId);
    this.cartService.removeItemFromCart(cartId, productId).subscribe({
      next: (cart) => {
        console.log('next',cart);
        if (cart) {
          console.log('remove successful', cart);
          this.snackBar.open(`Product deleted successfully!`, '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.getCart();
        } else {
          console.error('No cart returned from the server');
        }
      },
      error: (err) => {
        console.error('delete item error', err);
      },
    });
  }

  calculateSelectedTotalPrice(): void {
    this.selectedTotalPrice = this.cart.cartItems
      .filter((item) =>
        this.selectedItems.some(
          (selectedItem) =>
            selectedItem.productId === item.productId && selectedItem.selected
        )
      )
      .reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }

  updateSelectAllState(): void {
    this.allSelected = this.selectedItems.every((item) => item.selected);
    console.log(this.allSelected);
  }
  submitOrder(cartId: number) {
    if (this.allSelected) {
      this.orderService.createOrderFromCart(cartId).subscribe({
        next: (order) => {
          this.router.navigate(['/order']);
          this.cartService.updateCartItemCount(0);
          console.log('Order created successfully: ', order);
        },
        error: (err) => {
          console.log('Error creating order: ', err);
        },
      });
    } else {
      const selectedProductIds = this.selectedItems
        .filter((item) => item.selected)
        .map((item) => item.productId);

      this.orderService
        .createOrderFromSelectedItems(cartId, selectedProductIds)
        .subscribe({
          next: (order) => {
            this.router.navigate(['/order']);
            this.cartService.updateCartItemCount(selectedProductIds.length);
            console.log('Order created successful: ', order);
          },
          error: (err) => {
            console.log('Error error creating order: ', err);
          },
        });
    }
  }

  onQuantityChange(event: { productId: number; quantity: number }) {
    const { productId, quantity } = event;
    const cartItem = this.cart.cartItems.find(
      (item) => item.productId === productId
    );
    if (cartItem) {
      this.cartService
        .updateItemQuantity(this.cart.id, productId, quantity)
        .subscribe({
          next: (updatedCart) => {
            cartItem.quantity = quantity;
            console.log('update successful', updatedCart);
          },
          error: (err) => {
            console.error('Error updating quantity', err);
          },
        });
    }
  }

  navigateToProducts() {
    this.router.navigate(['/products']);
  }
}
