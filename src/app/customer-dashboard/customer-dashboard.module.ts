import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerDashboardRoutingModule } from './customer-dashboard-routing.module';
import { OrderModule } from './order/order.module';
import { CartModule } from './cart/cart.module';
import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrderModule,
    CartModule,
    ProductModule,
    CustomerDashboardRoutingModule
  ]
})
export class CustomerDashboardModule { }
