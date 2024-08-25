import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductModule } from './product/product.module';
import { ProductListComponent } from './product/product-list/product-list.component';
import { CartViewComponent } from './cart/cart-view/cart-view.component';
import { CustomerDashboardModule } from './customer-dashboard.module';
import { OrderComponent } from './order/order/order.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { CustomerAuthGuard } from '../auth/customer-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CustomerAuthGuard], // Protect the root path
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' }, // Redirect to 'products' after guard checks
      { path: 'products', component: ProductListComponent },
      { path: 'cart', component: CartViewComponent },
      { path: 'order', component: OrderComponent },
      { path: 'order-detail/:orderId', component: OrderDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDashboardRoutingModule {}
