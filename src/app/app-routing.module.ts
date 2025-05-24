import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ProductComponent } from './feature/product/product.component';
import { AddProductComponent } from './feature/add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'product',

    children: [
      { path: ':id', component: ProductComponent, pathMatch: 'full' },
      { path: ':id/edit', component: AddProductComponent, pathMatch: 'full' },
    ],
  },
  {
    path: 'addproduct',
    component: AddProductComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
