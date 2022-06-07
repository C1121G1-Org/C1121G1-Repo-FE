/*
    Created by TuanNQ
    Time: 11:00 02/06/2022
    Function: Show detail purchase history
*/
export interface PurchaseHistoryDto {
  id?: number;
  name?: string;
  gender?: boolean;
  dateOfBirth?: string;
  email?: string;
  phoneNumber?: string;
  purchaseDate?: string;
  purchaseProducts?: string;
  totalMoney?: string;
}
