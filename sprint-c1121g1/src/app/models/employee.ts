import {Position} from './position';

export interface Employee {
  id: number;

  employeeName: string;

  dateOfBirth: boolean;

  address: string;

  idCard: string;

  phoneNumber: string;

  image: string;

  position: Position;

  account: Account;

  deleteFlag: boolean;
}
