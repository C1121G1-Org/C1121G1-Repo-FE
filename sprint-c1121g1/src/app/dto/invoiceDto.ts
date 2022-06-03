import {CustomerDto} from "./customerDto";

import {ProductInvoiceDto} from "./productInvoiceDto";
import {Product} from "../models/product";

export class InvoiceDto {

  totalMoney: number;
  payments: number;
  customer: CustomerDto;


}
