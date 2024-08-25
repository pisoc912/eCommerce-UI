import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ComponentsModule } from '../../components/components.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [ProductListComponent, ProductDetailComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    MatChipsModule
  ],
  exports: [ProductListComponent],
})
export class ProductModule {}
