import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import {
  catchError,
  distinctUntilChanged,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductService } from 'src/app/core/services/product.service';
import { PasswordModel } from 'src/app/model/login.model';
import { productModel } from 'src/app/model/product.model';
import { ChangepasswordComponent } from 'src/app/shared/changepassword/changepassword.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from 'src/app/shared/notification.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, ReactiveFormsModule],
})
export class LayoutComponent {
  searchedData: productModel[] = [];
  isseachFocused: boolean = false;
  isProfileClicked: boolean = false;
  searchControl = new FormControl('');
  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService,
    private loginSerive: LoginService,
    private notificationService: NotificationService
  ) {
    this.authService.loadToken();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((value: string | null) => {
          return this.productService.searchProduct(value);
        })
      )
      .subscribe((data: any) => {
        this.searchedData = data;
      });
  }
  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
    this.searchControl.setValue(null);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  changePassword() {
    const dialogref = this.dialog.open(ChangepasswordComponent, {
      height: '400px',
      width: '600px',
    });
    dialogref.afterClosed().subscribe((data) => {
      const passwordModel = new PasswordModel();
      passwordModel.name = this.authService.authDate.sub;
      passwordModel.newPassword = data.newPassword;
      passwordModel.currentPassword = data.currentPassword;

      this.loginSerive
        .changePassword(passwordModel)
        .pipe(
          catchError((e, c) => {
            this.notificationService.openSnackBar(e.error);
            return throwError(() => e);
          })
        )
        .subscribe(() => {
          this.notificationService.openSnackBar(
            'successfully changed password'
          );
          this.logout();
        });
    });
  }
}
