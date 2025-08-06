import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './feature/home/home.component';
import { ProductComponent } from './feature/product/product.component';
import { AddProductComponent } from './feature/add-product/add-product.component';
import { LoginComponent } from './feature/login/login.component';
import { authGuard } from './core/guard/auth.guard';
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './feature/reset-password/reset-password.component';
import { UserDetailComponent } from './feature/user-details/user-details.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
  {
    path: 'user-details',
    component: UserDetailComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
