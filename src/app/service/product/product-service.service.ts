import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryEnum } from 'src/app/models/category.enum';
import { Product } from 'src/app/models/product.model';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = environment.apiUrl + '/api/product';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  getProductsBySeller(sellerId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/seller/${sellerId}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(productId: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${productId}`, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/${productId}`);
  }
  categoryColors: { [key in CategoryEnum]: string } = {
    [CategoryEnum.TELEVISION]: 'chip-blue',
    [CategoryEnum.AUDIO]: 'chip-green',
    [CategoryEnum.COMPUTERS]: 'chip-orange',
    [CategoryEnum.APPLIANCES]: 'chip-red',
    [CategoryEnum.MOBILE_PHONES]: 'chip-purple',
    [CategoryEnum.GAMING]: 'chip-teal',
    [CategoryEnum.WEARABLES]: 'chip-pink',
    [CategoryEnum.CAMERAS]: 'chip-yellow',
    [CategoryEnum.HOME_AUTOMATION]: 'chip-brown',
    [CategoryEnum.HOME_APPLIANCES]: 'chip-gray',
    [CategoryEnum.PERSONAL_CARE]: 'chip-lime',
    [CategoryEnum.OUTDOOR]: 'chip-cyan',
    [CategoryEnum.SECURITY]: 'chip-indigo',
    [CategoryEnum.ACCESSORIES]: 'chip-amber',
    [CategoryEnum.MUSICAL_INSTRUMENTS]: 'chip-deep-purple',
    [CategoryEnum.ELECTRONICS]: 'chip-light-blue',
    [CategoryEnum.TABLETS]: 'chip-deep-orange',
  };

  getCategoryColor(category: CategoryEnum): string {
    return this.categoryColors[category] || 'default-chip-color';
  }
}
