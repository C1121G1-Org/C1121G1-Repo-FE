import {Product} from './product';
import {Employee} from './employee';
import {Supplier} from './supplier';

export interface Storage {
  id: number;

  createdDate: string;

  status: boolean;

  quantity: number;

  createdEmployee: Employee;

  product: Product;

  supplier: Supplier;

  deleteFlag: boolean;
}
