import {CustomerDto} from "./customerDto";

export interface InvoiceHistoryDto {
  id?: number;
  createDate?: string;
  createTime?: string;
  payments?: string;
  customer?: CustomerDto;
  totalMoney?: number;
  quantity?: number;
}
