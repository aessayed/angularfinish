import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HeroComponent } from './hero/hero.component';
import { RolexComponent } from './rolex/rolex.component';
import { UserFormComponent } from './user-form/user-form.component';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductListComponent } from './edit-product-list/edit-product-list.component';
import { EditProductComponent } from './edit-product-component/edit-product-component.component';
const routes: Routes = [
  { path: 'hero', component: HeroComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserFormComponent },
  { path: 'navbar', component: NavbarComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'about', component: AboutComponent },
  { path: 'rolex', component: RolexComponent },
  { path: 'editproduct/:id', component: EditProductComponent },
  { path: '', redirectTo: '/hero', pathMatch: 'full' },
  { path: '**', redirectTo: '/hero', pathMatch: 'full' }, // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
