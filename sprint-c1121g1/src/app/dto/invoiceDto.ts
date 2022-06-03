import {CustomerDto} from './customerDto';
import {ProductDto} from './productDto';

export interface InvoiceDto {
  id?: number;
  createDate?: string;
  createTime?: string;
  payments?: string;
  customerName?: string;
  productName?: string;
  totalMoney?: number;
  quantity?: number;
}
