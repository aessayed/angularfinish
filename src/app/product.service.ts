// ProductService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost/firstproject/src/products.php';
  private uploadUrl = 'http://localhost/firstproject/src/upload.php'; // Endpoint for image upload

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  updateProduct(productId: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/products/${productId}`, product);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`);
  }

  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<any>(this.uploadUrl, formData);
  }
}
