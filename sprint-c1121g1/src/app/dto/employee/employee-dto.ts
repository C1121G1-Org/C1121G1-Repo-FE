import {PositionDto} from "./position-dto";
import {AccountDto} from "./account-dto";

export interface EmployeeDto {
  id?: number;
  name?: string;
  dateOfBirth?: string;
  address?: string;
  idCard?: string;
  phoneNumber?: string;
  image?: string;
  namePosition?: string;
  idPosition?: number;
}
