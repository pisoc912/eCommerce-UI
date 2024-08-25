import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-price-summary',
  templateUrl: './price-summary.component.html',
  styleUrls: ['./price-summary.component.css'],
})
export class PriceSummaryComponent {
  @Input() totalPrice: number = 0;

  shippingFee: number = 15;
  taxFee: number = 0;

  calculateSubtotal() {
    return this.totalPrice;
  }

  calculateTax() {
    return this.totalPrice * 0.1;
  }

  calculateTotal() {
    return this.calculateSubtotal() + this.calculateTax() + this.shippingFee;
  }
}
