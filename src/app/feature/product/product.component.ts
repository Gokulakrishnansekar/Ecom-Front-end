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
  userId: number;
  subscription: Subscription;
  product$ = new BehaviorSubject<productModel>(new productModel());
  route: ActivatedRoute;
  constructor(
    route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
    this.route = route;
    this.userId = route.snapshot.params['id'];
  }
  ngOnInit(): void {
    this.subscription = this.productService
      .getProductById(this.userId)
      .pipe(
        switchMap((product) => {
          this.product$.next(product);
          console.log(product);
          return of(null);
          // return this.productService.getImageById(product.id);
        }),
        catchError((e) => {
          return of(null);
        })
      )
      .subscribe((image: Blob | any | null) => {
        if (image) console.log(image);
        else console.log('error with image');
      });
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
          window.alert(e);
        },
      });
  }
}
