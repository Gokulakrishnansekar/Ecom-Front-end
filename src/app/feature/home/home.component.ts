import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { productModel } from 'src/app/model/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  products$ = new BehaviorSubject<productModel[]>([]);
  supscription: Subscription;
  constructor(private productService: ProductService) {}
  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }
  ngOnInit(): void {
    this.supscription = this.productService
      .getProducts()
      .subscribe((data: productModel[]) => {
        console.log(data);
        this.products$.next(data);
      });
  }
}
