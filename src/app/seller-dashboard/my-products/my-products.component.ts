import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ProductService } from 'src/app/service/product/product-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css'],
})
export class MyProductsComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = [
    'id',
    'name',
    'price',
    'quantity',
    'category',
    'brand',
    'description',
    'image',
    'actions',
  ];
  dataSource = new MatTableDataSource<Product>(this.products);
  sellerId: number = 0;
  editingIndex: number | null = null;
  showNewProductForm: boolean = false;
  editForm!: FormGroup;
  newProductForm!: FormGroup;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userData = this.authService.getCurrentUser();
    this.sellerId = userData.id;
    this.loadProducts();

    this.newProductForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      category: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      imageUrl: new FormControl('', Validators.required),
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  loadProducts(): void {
    this.productService.getProductsBySeller(this.sellerId).subscribe({
      next: (res) => {
        this.products = res;
        this.dataSource.data = this.products;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openNewProductForm(): void {
    this.showNewProductForm = true;
  }

  cancelNewProduct(): void {
    this.showNewProductForm = false;
    this.newProductForm.reset();
  }

  onSubmitNewProduct(): void {
    if (this.newProductForm.valid) {
      const newProduct: Product = {
        ...this.newProductForm.value,
        sellerId: this.sellerId,
      };

      this.productService.createProduct(newProduct).subscribe({
        next: (product) => {
          this.snackBar.open('Product created successfully', 'Close', {
            duration: 2000,
          });
          this.loadProducts();
          this.cancelNewProduct();
        },
        error: (err) => {
          console.log('Error creating product:', err);
        },
      });
    }
  }

  getFormControl(controlName: string): FormControl {
    return this.editForm.get(controlName) as FormControl;
  }

  startEdit(row: Product, index: number): void {
    this.editingIndex = index;
    this.editForm = new FormGroup({
      productName: new FormControl(row.name, Validators.required),
      price: new FormControl(row.price, [
        Validators.required,
        Validators.min(0),
      ]),
      quantity: new FormControl(row.quantity, [
        Validators.required,
        Validators.min(0),
      ]),
      category: new FormControl(row.category, Validators.required),
      brand: new FormControl(row.brand, Validators.required),
      description: new FormControl(row.description, Validators.required),
      imageUrl: new FormControl(row.imageUrl, Validators.required),
    });
  }

  saveEdit(row: Product): void {
    if (this.editForm.valid) {
      const updatedProduct = {
        ...row,
        ...this.editForm.value,
      };

      this.productService
        .updateProduct(updatedProduct.productId, updatedProduct)
        .subscribe({
          next: () => {
            this.snackBar.open('Product updated successfully', 'Close', {
              duration: 2000,
            });
            this.loadProducts();
            this.cancelEdit();
          },
          error: (err) => {
            console.log('Error updating product:', err);
          },
        });
    }
  }

  cancelEdit(): void {
    this.editingIndex = null;
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.snackBar.open('Product deleted successfully', 'Close', {
          duration: 2000,
        });
        this.loadProducts();
      },
      error: (err) => {
        console.log('Error deleting product:', err);
      },
    });
  }
}
