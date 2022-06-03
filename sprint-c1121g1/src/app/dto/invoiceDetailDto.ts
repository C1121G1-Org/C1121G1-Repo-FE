import {InvoiceDto} from "./invoiceDto";
import {ProductInvoiceDto} from "./productInvoiceDto";

export class InvoiceDetailDto {

  invoiceDto: InvoiceDto;
  productInvoiceDtoList: ProductInvoiceDto[] = [];


  constructor() {
    // this.productInvoiceDtoList.push(new ProductInvoiceDto());
  }
}
