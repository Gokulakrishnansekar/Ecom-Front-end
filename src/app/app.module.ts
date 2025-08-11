import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from '@angular/common/http';
import { ProductComponent } from './feature/product/product.component';
import { AddProductComponent } from './feature/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthinterceptorInterceptor } from './core/interceptor/authinterceptor.interceptor';
import { LoginComponent } from './feature/login/login.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { ChangepasswordComponent } from './shared/changepassword/changepassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ForgotPasswordComponent } from './feature/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './feature/reset-password/reset-password.component';
import { UserDetailComponent } from './feature/user-details/user-details.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddUserDialogComponent } from './feature/user-details/add-user-dialog/add-user-dialog.component';
import { DeleteUserConfirmationComponent } from './feature/user-details/delete-user-confirmation/delete-user-confirmation.component';
import { UrlService } from './core/services/URL.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
export function loadConfig(http: HttpClient, url: UrlService) {
  return () =>
    http
      .get('/assets/config.json')
      .toPromise()
      .then((config: any) => {
        // Store config globally, e.g., in a service or window object
        console.log(config.serverUrl);
        url.apiUrl = config.serverUrl;
      });
}
@NgModule({
  declarations: [AppComponent],
  imports: [
    AddUserDialogComponent,
    DeleteUserConfirmationComponent,
    MatSnackBarModule,
    UserDetailComponent,
    ResetPasswordComponent,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeComponent,
    ProductComponent,
    AddProductComponent,
    LoginComponent,
    LayoutComponent,
    ChangepasswordComponent,
    BrowserAnimationsModule,
    ForgotPasswordComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorInterceptor,
      multi: true,
    },

    {
      provide: APP_INITIALIZER,
      useFactory: loadConfig,
      deps: [HttpClient, UrlService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
