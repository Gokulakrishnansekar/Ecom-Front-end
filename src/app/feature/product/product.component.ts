import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
  Router,
} from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  of,
  Subscription,
  switchMap,
  tap,
} from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { productModel } from 'src/app/model/product.model';
import { NgIf, AsyncPipe, DatePipe } from '@angular/common';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { NotificationService } from 'src/app/shared/notification.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  standalone: true,
  imports: [LayoutComponent, NgIf, AsyncPipe, DatePipe, MatButtonModule],
})
export class ProductComponent implements OnInit {
  showLoader = false;
  userId: number | null;
  subscription: Subscription;
  product$ = new BehaviorSubject<productModel>(new productModel());
  route: ActivatedRoute;
  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private notificationService: NotificationService,
    public authService: AuthService
  ) {
    this.route = route;
  }
  ngOnInit(): void {
    this.showLoader = true;
    this.subscription = this.route.paramMap
      .pipe(
        tap((params) => {
          const id = params.get('id');
          this.userId = id ? +id : null;
        }),
        switchMap(() => {
          return this.productService.getProductById(this.userId!);
        })
      )
      .subscribe((data) => {
        this.showLoader = false;
        this.product$.next(data);
      });
  }
  deleteProduct(id: number) {
    this.productService
      .deleteProduct(id)
      .pipe()
      .subscribe({
        next: () => {
          this.notificationService.openSnackBar('Product Deleted Successfully');

          this.router.navigate(['/']);
        },
        error: (e) => {
          window.alert(e.error.message);
        },
      });
  }
  buyProduct() {
    window.alert('need to be implemented');
  }
  updateProduct(id: number): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
