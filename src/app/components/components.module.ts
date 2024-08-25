import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { PriceSummaryComponent } from './price-summary/price-summary.component';
import { FormsModule } from '@angular/forms';
import { CartItemControlComponent } from './cart-item-control/cart-item-control.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [PriceSummaryComponent, CartItemControlComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  ],
  exports: [PriceSummaryComponent, CartItemControlComponent],
})
export class ComponentsModule {}
