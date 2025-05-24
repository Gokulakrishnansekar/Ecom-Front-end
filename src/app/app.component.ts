import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductService } from './core/services/product.service';
import { productModel } from './model/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ecom';
  searchedData: productModel[] = [];
  isseachFocused: boolean = false;
  searchControl = new FormControl('');
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap((value: string | null) => {
          return this.productService.searchProduct(value);
        })
      )
      .subscribe((data) => {
        this.searchedData = data;
      });
  }
  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
    this.searchControl.setValue(null);
    console.log(this.searchControl.value);
  }

  fcs() {
    console.log('focused');
  }
}
