import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-component.component.html',
  styleUrls: ['./edit-product-component.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  product: Product = { id: 0, name: '', description: '', price: 0, image: '' };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.productId = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = +params['id']; // Ensure 'id' matches the route parameter name
      if (id) {
        this.productId = id;
        this.product.id = this.productId;

        this.fetchProductDetails(); // Fetch product details using the ID
      } else {
        console.error('Product ID is undefined');
        this.errorMessage = 'Product ID is undefined';
      }
    });
  }

  fetchProductDetails(): void {
    console.log('id recently from .component', this.productId);
    this.productService.getProductById(this.productId).subscribe(
      (product) => {},
      (error) => {
        console.error('Error fetching product details', error);
        this.errorMessage = 'Error fetching product details';
      }
    );
  }

  updateProduct(): void {
    console.log(this.productId);
    if (this.productId !== undefined) {
      console.log(this.product);
      this.productService.updateProduct(this.productId, this.product).subscribe(
        () => {
          alert('Product updated successfully');
        },
        (error) => {
          console.error('Error updating product', error);
          this.errorMessage = 'Error updating product';
        }
      );
    } else {
      console.error('Product ID is undefined');
    }
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
  deleteProduct(): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(this.productId).subscribe(
        () => {
          // Handle successful deletion (e.g., navigate to another page)
          this.router.navigate(['/product-list']);
        },
        (error) => {
          console.error('Error deleting product', error);
          this.errorMessage = 'Error deleting product';
        }
      );
    }
  }
}
