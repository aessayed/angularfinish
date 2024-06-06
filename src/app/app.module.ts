import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; // Correct import path

import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';

import { RolexComponent } from './rolex/rolex.component';
import { ProductComponent } from './product/product.component';

import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductListComponent } from './edit-product-list/edit-product-list.component';
import { EditProductComponent } from './edit-product-component/edit-product-component.component'; // Correct import path
import { FileUploadComponent } from './file-upload/file-upload.component';

import { provideHttpClient, withFetch } from '@angular/common/http'; // Import necessary HttpClient utilities

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    AboutComponent,
    NavbarComponent,
    FooterComponent,
    HeroComponent,

    RolexComponent,
    ProductComponent,
    UserFormComponent,
    LoginComponent,
    AddProductComponent,
    ProductListComponent,
    EditProductListComponent,
    EditProductComponent, // Correct import path
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule, // Correct import statement
    ReactiveFormsModule,
  ],
  providers: [provideHttpClient(withFetch())], // Add provideHttpClient(withFetch()) to providers array
  bootstrap: [AppComponent],
})
export class AppModule {}
