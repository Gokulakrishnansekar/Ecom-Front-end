import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { BehaviorSubject, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from 'src/app/core/services/login.service';
import { ProductService } from 'src/app/core/services/product.service';
import { PasswordModel } from 'src/app/model/login.model';
import { productModel } from 'src/app/model/product.model';
import { ChangepasswordComponent } from 'src/app/shared/changepassword/changepassword.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    ReactiveFormsModule,
    MatProgressBarModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  @Input() showLoader;
  isMenuOpen = false;
  searchedData$ = new BehaviorSubject<productModel[]>([]);
  issearchFocused: boolean = false;
  isProfileClicked: boolean = false;
  searchControl = new FormControl('');
  constructor(
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
    public authService: AuthService,
    private loginSerive: LoginService,
    private notificationService: NotificationService,
    public cdr: ChangeDetectorRef,
    private eRef: ElementRef
  ) {
    this.authService.loadToken();
  }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        switchMap((value: string | null) => {
          return this.productService.searchProduct(value);
        })
      )
      .subscribe((data: any) => {
        this.searchedData$.next(data);
        this.cdr.detectChanges();
      });
  }

  // Detect clicks anywhere on the page
  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    // If click target is outside the left-section (menu + toggle button)
    if (
      !this.eRef.nativeElement
        .querySelector('.left-section')
        ?.contains(event.target)
    ) {
      this.isMenuOpen = false;
    }
    if (
      !this.eRef.nativeElement
        .querySelector('.search-wrapper')
        ?.contains(event.target)
    ) {
      this.issearchFocused = false;
    } else {
      this.issearchFocused = true;
    }
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
