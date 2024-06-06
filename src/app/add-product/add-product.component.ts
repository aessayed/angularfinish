import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  product: Product = { name: '', description: '', price: 0, image: '' };

  constructor(private productService: ProductService) {}

  addProduct(): void {
    this.productService.addProduct(this.product).subscribe(
      () => {
        // Reset form after successful addition
        this.product = { name: '', description: '', price: 0, image: '' };
        alert('Product added successfully');
      },
      (error) => {
        alert('Error adding product');
      }
    );
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Call your backend API to upload the file and get the image URL
      this.productService.uploadImage(formData).subscribe(
        (response) => {
          this.product.image = response.imageUrl; // Assuming your API returns the image URL in a field named imageUrl
        },
        (error) => {
          console.error('Error uploading image', error);
        }
      );
    }
  }
}
