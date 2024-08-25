import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerDashboardRoutingModule } from './seller-dashboard-routing.module';
import { MyProductsComponent } from './my-products/my-products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import {  MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    MyProductsComponent,
    DashboardComponent,
    MyOrdersComponent,
    SettingsComponent,
    MyOrdersComponent,
  ],
  imports: [
    CommonModule,
    SellerDashboardRoutingModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class SellerDashboardModule {}
