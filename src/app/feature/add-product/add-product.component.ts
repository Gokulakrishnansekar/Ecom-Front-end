import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ProductService } from 'src/app/core/services/product.service';
import { productModel } from 'src/app/model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productModel: productModel = new productModel();
  productImage: File;
  id$ = new BehaviorSubject<boolean>(false);

  constructor(
    private pservice: ProductService,
    private router: Router,
    private aroute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.aroute.snapshot.params['id'];
    if (id) {
      this.pservice.getProductById(id).subscribe((product: productModel) => {
        console.log(product);
        this.productModel = product;
        this.productImage = this.base64ToFile(
          'data:image/jpeg;base64,' + product.imageData,
          product.name
        );

        this.id$.next(true);
      });
    }
  }
  addProduct(): void {
    this.pservice.saveProduct(this.productModel, this.productImage).subscribe({
      next: () => {
        window.alert('Product added');
        this.router.navigate(['/']);
      },
      error: (e) => {
        console.log(e);
        window.alert(e.error.message);
      },
    });
  }

  updateProduct(): void {
    this.pservice
      .updateProduct(this.productModel, this.productImage)
      .subscribe({
        next: () => {
          window.alert('Product updated');
          this.router.navigate(['/']);
        },
        error: (e) => {
          console.log(e);
          window.alert(e.error.message);
        },
      });
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
    console.log(event.target.files[0]);
    this.productImage = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log((e.target?.result as string).split(',')[1]);
      this.productModel.imageData = (e.target?.result as string).split(',')[1];
    };

    reader.readAsDataURL(event.target.files[0]);
    //this.productModel.file = event.target.files[0];
    // console.log(this.productModel.file, event.target.files[0]);
  }
}
