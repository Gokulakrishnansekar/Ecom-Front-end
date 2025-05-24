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

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  userId: number | null;
  subscription: Subscription;
  product$ = new BehaviorSubject<productModel>(new productModel());
  route: ActivatedRoute;
  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.route = route;
  }
  ngOnInit(): void {
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
      .subscribe((data) => this.product$.next(data));

    // .subscribe((image: Blob | any | null) => {
    //   if (image) console.log(image);
    //   else console.log('error with image');
    // };
  }
  deleteProduct(id: number) {
    this.productService
      .deleteProduct(id)
      .pipe()
      .subscribe({
        next: () => {
          window.alert('Product Deleted');
          this.router.navigate(['/']);
        },
        error: (e) => {
          window.alert(e.error.message);
        },
      });
  }
  updateProduct(id: number): void {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
}
