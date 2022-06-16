import {ICustomer} from '../models/ICustomer';
import {ProductInvoice} from './productInvoice';

export interface InvoiceDetail {
    customerDto?: ICustomer;
    payment?: string;
    productInvoice?: ProductInvoice[] ;
    totalMoney?: string;
}
