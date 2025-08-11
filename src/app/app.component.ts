import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ProductService } from './core/services/product.service';
import { productModel } from './model/product.model';
import { Router } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ecom';
  @Input() showLoader: boolean;
}
