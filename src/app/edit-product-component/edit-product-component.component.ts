import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product-component.component.html',
  styleUrls: ['./edit-product-component.component.css'],
})
export class EditProductComponent implements OnInit {
  productId: number;
  product: Product = { id: 0, name: '', description: '', price: 0 };
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
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
    console.log(this.productId); // Debugging: Check if productId is correctly passed
    if (this.productId !== undefined) {
      console.log(this.product);
      this.productService.updateProduct(this.productId, this.product).subscribe(
        () => {
          // Handle successful update (e.g., show a success message)
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
}
