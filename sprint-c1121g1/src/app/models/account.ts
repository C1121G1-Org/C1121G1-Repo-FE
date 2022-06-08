import {Employee} from './employee';

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Interface: Account
*/

export interface Account {
  id: number;

  userName: string;

  encryptPassword: boolean;

  email: number;

  isEnabled: boolean;

  verificationCode: number;

  employee: Employee;
  deleteFlag: boolean;
}
