import {Customer} from "../models/customer";
import {ProductInvoice} from "./productInvoice";

export interface InvoiceDetail {
    customerDto?: Customer;
    payment?: string;
    productInvoice?: ProductInvoice[] ;
    totalMoney?: string;
}
