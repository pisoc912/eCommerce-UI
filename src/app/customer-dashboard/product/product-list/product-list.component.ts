import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartItem } from 'src/app/models/cart-item.model';
import { CategoryEnum } from 'src/app/models/category.enum';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { CartService } from 'src/app/service/cart/cart.service';

import { ProductService } from 'src/app/service/product/product-service.service';
import { CATEGORY_COLORS } from 'src/utils/category-colors';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  user!:User |null;
  userId!: number;
  cartItems: CartItem[] = [];
  cartId: number = 0;
  searchQuery = '';
  categories: string[] = ['All', ...Object.values(CategoryEnum)];
  filteredProducts: Product[] = [];
  filteredOptions: string[] = [];
  selectedCategory: CategoryEnum | 'All' = 'All';

  constructor(
    private authService:AuthService,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser()

    if (!this.user) {
      console.log('User is not logged in');
      this.snackBar.open("User is not logged in",'',{duration:2000})
    } else {
      this.userId = this.user.id!;
      this.loadCartItems();
    }
  }

  loadCartItems(): void {
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (cart) => {
        if (cart && cart.cartItems) {
          this.cartItems = cart.cartItems;
          this.cartId = cart.id;
        }
        console.log('cart', cart);
        console.log('cartItems', this.cartItems);
        this.loadProducts();
      },
      error: (error) => {
        console.error('Failed to load cart items', error);
        this.loadProducts();
      },
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data.map((product) => ({
          ...product,
          isInCart: this.isProductInCart(product.productId),
          isLiked: false,
        }));
        this.applyFilters();
      },
      error: (error) => {
        console.error('Failed to load products', error);
      },
    });
  }

  isProductInCart(productId: number): boolean {
    return this.cartItems.some((item) => item.productId === productId);
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) &&
        (this.selectedCategory === 'All' ||
          product.category === this.selectedCategory)
    );
  }

  onSearchChange(query: string): void {
    this.searchQuery = query;
    this.applyFilters();
  }

  onCategoryChange(event: any): void {
    this.selectedCategory = event.value;
    this.applyFilters();
  }

  addToCart(product: Product) {
    if (this.userId === 0) {
      console.log('User is not logged in');
      return;
    }
    const quantity = 1;
    console.log('id', product.productId);
    console.log(this.userId);
    this.cartService
      .addItemToCart(
        this.userId,
        product.productId,
        product.name,
        quantity,
        product.price
      )
      .subscribe({
        next: (cart) => {
          console.log('Product added to cart:', cart);
          product.isInCart = true;
          this.snackBar.open('Product add to cart!', '', {
            duration: 2000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.refreshCart();
        },
        error: (error) => {
          console.error('Failed to add product to cart', error);
        },
      });
  }

  addToLike(product: Product) {
    product.isLiked = !product.isLiked;
    console.log('add to like', product);
  }

  getCartQuantity(product: Product) {
    const cartItem = this.cartItems.find(
      (item) => item.productId === product.productId
    );
    return cartItem ? cartItem.quantity : 0;
  }

  refreshCart() {
    this.cartService.getCartByUserId(this.userId).subscribe({
      next: (cart) => {
        if (cart && cart.cartItems) {
          this.cartItems = cart.cartItems;
          const totalItems = cart.cartItems.reduce(
            (sum, item) => sum + item.quantity,
            0
          );
          this.cartService.updateCartItemCount(totalItems);
        }
      },
      error: (error) => {
        console.log('Failed to refresh cart', error);
      },
    });
  }

  onQuantityChange(event: { productId: number; quantity: number }) {
    const { productId, quantity } = event;
    const cartItem = this.cartItems.find(
      (item) => item.productId === productId
    );

    if (cartItem) {
      this.cartService
        .updateItemQuantity(this.cartId, productId, quantity)
        .subscribe({
          next: (updatedCart) => {
            cartItem.quantity = quantity;
          },
          error: (err) => {
            console.error('Error updating quantity', err);
          },
        });
    }
  }

  // get category color
  getCategoryColor(category: string): string {
    return CATEGORY_COLORS[category as CategoryEnum] || 'default-chip-color';
  }
}
