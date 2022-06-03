/*
    Created by TuanNQ
    Time: 18:00 31/05/2022
    Function: Show all list report customer
*/
export interface ReportCustomerDto {
  id?: number;
  name?: string;
  gender?: boolean;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  purchaseTimes?: number;
  age?: number;
}
