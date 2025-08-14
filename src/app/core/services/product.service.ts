import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productModel } from 'src/app/model/product.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UrlService } from './URL.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient, private url: UrlService) {}

  getProducts(): Observable<productModel[]> {
    return this.http.get<productModel[]>(`${this.url.apiUrl}/api/products`);
  }
  getProductById(id: number | null): Observable<productModel> {
    return this.http.get<productModel>(`${this.url.apiUrl}/api/products/${id}`);
  }

  getImageById(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.url.apiUrl}/api/products/${id}/image`);
  }

  saveProduct(
    product: productModel,
    image: File | string
  ): Observable<productModel> {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    formData.append('image', image);
    return this.http.post<productModel>(
      `${this.url.apiUrl}/api/product`,
      formData
    );
  }

  updateProduct(product: productModel, image: File): Observable<productModel> {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    formData.append('image', image);
    return this.http.put<productModel>(
      `${this.url.apiUrl}/api/product`,
      formData
    );
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url.apiUrl}/api/product/${id}`);
  }

  searchProduct(key: string | null) {
    return this.http.get<productModel[]>(
      `${this.url.apiUrl}/api/products/search?key=${key}`
    );
  }
}
