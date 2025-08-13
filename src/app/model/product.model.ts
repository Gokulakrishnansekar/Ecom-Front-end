import { FormControl, Validators } from '@angular/forms';
import { UsersModel } from './users.model';

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
  createdBy: UsersModel;
  constructor(params?: productModel) {
    if (params) {
      Object.assign(this, params);
    }
  }
}

export class ProductForm {
  constructor(
    model: productModel,
    public id = new FormControl<number>(model.id),
    public name = new FormControl<string>(model.name, Validators.required),
    public description = new FormControl<string>(
      model.description,
      Validators.required
    ),
    public price = new FormControl<number>(model.price, [
      Validators.required,
      Validators.pattern(`[0-9]+`),
    ]),
    public brand = new FormControl<string>(model.brand, Validators.required),
    public category = new FormControl<string>(
      model.category,
      Validators.required
    ),
    public is_available = new FormControl<boolean>(
      model.is_available,
      Validators.required
    ),
    public in_stock = new FormControl<number>(model.in_stock, [
      Validators.required,
      Validators.pattern(`[0-9]+`),
    ]),
    public release_date = new FormControl<string>(
      model.release_date,
      Validators.required
    ),
    public imageData = new FormControl<string>(
      model.imageData,
      Validators.required
    ),
    public createdBy = new FormControl<UsersModel>(model.createdBy)
  ) {}
}
