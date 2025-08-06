import { Location, NgIf, AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { ProductForm, productModel } from 'src/app/model/product.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LayoutComponent } from '../../layout/layout/layout.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { CATOGORY } from 'src/app/constants/catogory';
import { NotificationService } from 'src/app/shared/notification.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  standalone: true,
  imports: [
    LayoutComponent,
    FormsModule,
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  productImage: File;
  catagory = Object.values(CATOGORY);
  id$ = new BehaviorSubject<boolean>(false);
  ctrnl = new FormControl('aer');
  constructor(
    private pservice: ProductService,
    private router: Router,
    private aroute: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const id = this.aroute.snapshot.params['id'];
    if (id) {
      this.pservice.getProductById(id).subscribe((product: productModel) => {
        this.updateProductForm(product);
        this.productImage = this.base64ToFile(
          'data:image/jpeg;base64,' + product.imageData,
          product.name
        );

        this.id$.next(true);
      });
    } else {
      this.initiateProductForm();
    }
  }

  updateProductForm(product: productModel) {
    this.productForm = this.fb.group(
      new ProductForm(new productModel(product))
    );
  }

  initiateProductForm() {
    this.productForm = this.fb.group(new ProductForm(new productModel()));
  }
  addProduct(): void {
    this.pservice
      .saveProduct(this.productForm.value, this.productImage)
      .subscribe({
        next: () => {
          this.notificationService.openSnackBar('Product Added successfully');

          this.location.back();
        },
        error: (e) => {
          this.notificationService.openSnackBar(e.error.message);
        },
      });
  }

  updateProduct(): void {
    this.pservice
      .updateProduct(this.productForm.value, this.productImage)
      .subscribe({
        next: () => {
          this.notificationService.openSnackBar('Product Updated successfully');
          this.location.back();
        },
        error: (e) => {
          this.notificationService.openSnackBar(e.error.message);
        },
      });
  }

  get imageData() {
    return this.productForm.get('imageData').value;
  }
  set imageData(data) {
    this.productForm.get('imageData').setValue(data);
  }

  base64ToFile(base64: string, filename: string): File {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error('Invalid base64');
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  }

  fileUpload(event: any): void {
    this.productImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      this.productForm
        .get('imageData')
        .setValue((e.target?.result as string).split(',')[1]);
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}
