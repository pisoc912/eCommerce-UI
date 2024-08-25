import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';
import { SellerDashboardModule } from './seller-dashboard/seller-dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CustomerDashboardModule,
    SellerDashboardModule,
    LayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
