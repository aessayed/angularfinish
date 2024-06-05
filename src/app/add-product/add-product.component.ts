// src/app/add-product/add-product.component.ts

import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Product = { name: '', description: '', price: 0 };

  constructor(private productService: ProductService) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      () => {
        // Reset form after successful addition
        this.product = { name: '', description: '', price: 0 };
        alert('Product added successfully');
      },
      (error) => {
        alert('Error adding product');
      }
    );
  }
}
