import {Employee} from './employee';

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
