
import {AccountDto} from './accountDto';
import {PositionDto} from './positionsDto';

export interface EmployeeDto {
  id?: number;
  employeeName?: string;
  dateOfBirth?: string;
  address?: string;
  idCard?: string;
  phoneNumber?: string;
  image?: string;
  positionDto?: PositionDto;
  accountDto?: AccountDto;
}
