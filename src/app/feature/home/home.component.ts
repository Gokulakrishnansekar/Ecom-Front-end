import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, delay, Subscription } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { productModel } from 'src/app/model/product.model';
import { RouterLink } from '@angular/router';
import { NgFor, AsyncPipe, CommonModule } from '@angular/common';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    LayoutComponent,
    NgFor,
    RouterLink,
    AsyncPipe,
    CommonModule,
    MatButtonModule,
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  showLoader = false;
  products$ = new BehaviorSubject<productModel[]>([]);
  supscription: Subscription;
  constructor(
    private productService: ProductService,
    public authService: AuthService
  ) {}
  ngOnDestroy(): void {
    this.supscription.unsubscribe();
  }
  ngOnInit(): void {
    this.showLoader = true;
    this.supscription = this.productService
      .getProducts()
      .subscribe((data: productModel[]) => {
        this.products$.next(data);
        this.showLoader = false;
      });
  }
  addTocard(event: any): void {
    event.stopPropagation();
    window.alert('needs to be implemented');
  }
}
