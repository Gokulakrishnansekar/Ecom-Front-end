import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { productModel } from 'src/app/model/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_URL = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {}

  getProducts(): Observable<productModel[]> {
    return this.http.get<productModel[]>(`${this.API_URL}/products`);
  }
  getProductById(id: number | null): Observable<productModel> {
    return this.http.get<productModel>(`${this.API_URL}/products/${id}`);
  }

  getImageById(id: number): Observable<Blob> {
    return this.http.get<Blob>(`${this.API_URL}/products/${id}/image`);
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
    return this.http.post<productModel>(`${this.API_URL}/product`, formData);
  }

  updateProduct(product: productModel, image: File): Observable<productModel> {
    const formData = new FormData();
    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );
    formData.append('image', image);
    return this.http.put<productModel>(`${this.API_URL}/product`, formData);
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/product/${id}`);
  }

  searchProduct(key: string | null) {
    return this.http.get<productModel[]>(
      `${this.API_URL}/products/search?key=${key}`
    );
  }
}
