import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { productModel } from 'src/app/model/product.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  productModel: productModel;
  productImage: File;
  ngOnInit(): void {
    this.productModel = new productModel();
  }
  constructor(private pservice: ProductService, private router: Router) {}

  addProduct(): void {
    this.pservice.saveProduct(this.productModel, this.productImage).subscribe({
      next: () => {
        window.alert('Product added');
        this.router.navigate(['/']);
      },
      error: (e) => {
        window.alert(e);
      },
    });
  }

  fileUpload(event: any) {
    console.log(event.target.files[0]);
    this.productImage = event.target.files[0];
    //this.productModel.file = event.target.files[0];
    // console.log(this.productModel.file, event.target.files[0]);
  }
}
