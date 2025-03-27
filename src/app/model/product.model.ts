export class productModel {
  id: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  is_available: boolean;
  in_stock: number;
  release_date: string;
  imageData: string;
  constructor(params?: productModel) {
    if (params) {
      Object.assign(this, params);
    }
  }
}
