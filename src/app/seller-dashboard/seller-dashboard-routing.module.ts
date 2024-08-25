import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerNavComponent } from '../layout/seller/seller-nav/seller-nav.component';
import { sellerAuthGuard } from '../auth/seller-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path:'seller',
    canActivate:[sellerAuthGuard],
    children:[
      {path:'dashboard',component:DashboardComponent},
      {path:'products',component:MyProductsComponent},
      {path:'orders',component:MyOrdersComponent},
      {path:'settings',component:SettingsComponent},
      {path:'',redirectTo:'dashboard',pathMatch:'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerDashboardRoutingModule { }
