import {Product} from './product';
import {Employee} from './employee';
import {Supplier} from './supplier';

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Interface: Storage
*/
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
