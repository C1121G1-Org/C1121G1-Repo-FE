import {Position} from './position';

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Interface: Employee
*/
export interface Employee {
  id?: number;

  employeeName?: string;

  dateOfBirth?: boolean;

  address?: string;

  idCard?: string;

  phoneNumber?: string;

  image?: string;

  position?: Position;

  account?: Account;

  deleteFlag?: boolean;
}
