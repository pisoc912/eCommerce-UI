import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order/order.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [OrderComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    ComponentsModule
],
  exports: [OrderComponent],
})
export class OrderModule {}
