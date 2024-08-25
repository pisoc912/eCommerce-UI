import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartViewComponent } from './cart-view/cart-view.component';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { ComponentsModule } from '../../components/components.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CartViewComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    MatGridListModule,
    MatSnackBarModule,
  ]
})
export class CartModule {}
