import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { productModel } from 'src/app/model/product.model';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe } from '@angular/common';
import { LayoutComponent } from '../../layout/layout/layout.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [LayoutComponent, NgFor, RouterLink, AsyncPipe],
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
        this.products$.next(data);
      });
  }
  addTocard(event: any): void {
    event.stopPropagation();
  }
}
