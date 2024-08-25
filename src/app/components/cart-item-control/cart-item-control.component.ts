import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-cart-item-control',
  templateUrl: './cart-item-control.component.html',
  styleUrls: ['./cart-item-control.component.css'],
})
export class CartItemControlComponent {
  @Input() quantity: number = 0;
  @Input() productId!: number;
  @Input() cartId!: number;

  @Output() quantityChange = new EventEmitter<{
    productId: number;
    quantity: number;
  }>();

  decrementQuantity() {
    if (this.quantity > 0) {
      this.quantityChange.emit({
        productId: this.productId,
        quantity: this.quantity - 1,
      });
    }
  }

  incrementQuantity() {
    this.quantityChange.emit({
      productId: this.productId,
      quantity: this.quantity + 1,
    });
  }
}
