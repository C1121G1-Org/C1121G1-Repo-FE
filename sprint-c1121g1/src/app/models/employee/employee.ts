import {Positions} from './positions';

export interface Employee {
  id?: number;
  employeeName?: string;
  dateOfBirth?: string;
  address?: string;
  idCard?: string;
  phoneNumber?: string;
  image?: string;
  positions?: Positions;
  account?: Account;

}
