
/*
Created by CongNV
Date : 04/06/2022
Function: Search,Pageable
*/
export interface InvoiceDto {
  id?: number;
  createDate?: string;
  createTime?: string;
  payments?: string;
  customerName?: string;
  productName?: string;
  totalMoney?: number;
  quantity?: number;
  invoiceDetailId?: string;


}
