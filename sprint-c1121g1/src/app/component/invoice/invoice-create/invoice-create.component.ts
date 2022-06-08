import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {ProductService} from '../../../services/product/product.service';
import {ProductInvoice} from '../../../dto/productInvoice';
import {InvoiceDetail} from '../../../dto/InvoiceDetail';
import {InvoiceService} from '../../../services/invoice/invoice.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {ICustomer} from '../../../models/ICustomer';
import {IProduct} from '../../../dto/iProduct';


pdfMake.vfs = pdfFonts.pdfMake.vfs;



/*
 Created by LongNHL
 Time: 9:30 2/06/2022
 Function: create invoice
 */
@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {

  invoiceForm: FormGroup;


  currentProduct: IProduct;
  customer: ICustomer = {};
  productList: IProduct[] = [];
  invoiceDetail: InvoiceDetail;
  printInvoice: string;
  money: string;
  disableFlag: boolean = false;
  errorMap: any = [];
  // errorMap: string[] = [];
  error: any = {};
  checkOnchange: boolean;
  flagProduct: boolean = false;
  flagProductNull: boolean = true;
  errorList: string[] =[];
  dict: {key, value}[];


  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private invoiceService: InvoiceService) {
    this.invoiceForm = this.fb.group({
      payments: this.fb.control('', [Validators.required]),
      totalMoney: this.fb.control('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
      customerDto: this.fb.group({
        id: this.fb.control(''),
        customerName: this.fb.control('', [Validators.required, Validators.pattern('^([A-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\\s{1}[A-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$')]),
        phoneNumber: this.fb.control('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
        dateOfBirth: this.fb.control('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
        address: this.fb.control('', [Validators.required, Validators.maxLength(100)]),
        email: this.fb.control('', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,}){1,}$')]),
        gender: this.fb.control(true, [Validators.required]),
      }),
      products: this.fb.array(this.productList.map(product => this.createProducts(product))
      ),
    });

  }

  get products() {
    return <FormArray> this.invoiceForm.get('products');
  }

  get customerDto() {
    return <FormGroup> this.invoiceForm.get('customerForm');
  }

  ngOnInit(): void {
  }

  getCustomerModal(customerModal: any) {
    this.customer = customerModal;
    if (this.customer != null) {
      this.disableFlag = true;
    }
    this.chooseCustomer();
  }

  chooseCustomer() {
    let customerForm = this.createCustomer(this.customer);
    this.invoiceForm.controls.customerDto.patchValue(customerForm.value);
  }

  createCustomer(customer: ICustomer) {
    return this.fb.group({
      id: [customer.id],
      customerName: [customer.customerName],
      address: [customer.address],
      email: [customer.email],
      phoneNumber: [customer.phoneNumber],
      dateOfBirth: [customer.dateOfBirth],
      gender: [customer.gender]
    });
  }

  getProductQR(productQR: any) {
    this.currentProduct = productQR;
    this.chooseProduct();
  }

  getProductModal(productModal: any) {
    this.currentProduct = productModal;
    this.chooseProduct();
  }

  createProducts(product: ProductInvoice) {
    return this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      quantity: [1, [Validators.required, Validators.min(0), Validators.pattern('^[0]?[1-9]+[0-9]*$')]]
    });
  }

  getProducts(form): Array<any> {
    return form.controls.products.controls;
  }

  chooseProduct() {

    let productForm = this.createProducts(this.currentProduct);
    if(this.products.controls.length != 0){
      this.flagProductNull = true;
    }
    let flag: boolean = false;
    // for (let product of this.products.controls){
    //   if (productNew == product.get("id")){
    //     flag = true;
    //     product.get("quantity").patchValue(product.get("quantity").value +1);
    //   }
    // }
    // if (!flag){}
    let myArray = this.getProducts(this.invoiceForm);

    let test = myArray.filter(data => data.controls.id.value == this.currentProduct.id && this.currentProduct.id != null);
    if (test.length > 0) {
      flag = true;
    } else {
      flag = false;
    }
    if (!flag) {
      this.products.push(productForm);
    } else {
      const container = document.getElementById('main-container');
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      button.setAttribute('data-target', '#modal-error');
      container.appendChild(button);
      // this.check = true;
      button.click();
    }
    this.money = this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2);
  }

  deleteProduct(i: number, length: number) {
    this.products.removeAt(i);
    console.log(this.products.controls.length);
    if(this.products.controls.length != 0){
      this.flagProduct = true;
    }
    if (length <= 1) {
      this.money = null;
    } else {
      this.money = this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2);
    }
  }

  getTotalMoney() {
    this.money = this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2);
    if (isNaN(parseInt(this.money)) || parseInt(this.money) <= 0) {
      this.money = null;
    }

  }

  createInvoice(success: HTMLButtonElement) {
    if (this.invoiceForm.get('customerDto.customerName').value == '') {
      this.invoiceForm.get('customerDto.customerName').setErrors({empty: true});
    }
    if (this.invoiceForm.get('customerDto.phoneNumber').value == '') {
      this.invoiceForm.get('customerDto.phoneNumber').setErrors({empty: true});
    }
    if (this.invoiceForm.get('customerDto.dateOfBirth').value == '') {
      this.invoiceForm.get('customerDto.dateOfBirth').setErrors({empty: true});
    }
    if (this.invoiceForm.get('customerDto.address').value == '') {
      this.invoiceForm.get('customerDto.address').setErrors({empty: true});
    }
    if (this.invoiceForm.get('customerDto.email').value == '') {
      this.invoiceForm.get('customerDto.email').setErrors({empty: true});
    }
    this.invoiceDetail = this.invoiceForm.value;
    this.invoiceDetail.totalMoney = this.money;
    console.log(this.invoiceForm.getRawValue());
    this.invoiceService.updateQuantity(this.invoiceDetail).subscribe((message) => {
      this.invoiceService.createInvoice(this.invoiceDetail).subscribe(() => {
        console.log(this.invoiceDetail);
        this.money = null;
        success.click();
        if (this.printInvoice === 'yes') {
          this.generatePDF('yes',);
        }
        this.invoiceForm.reset();
        // window.location.reload();
      });
    }, error => {
      this.dict = Object.entries(error.error.errorMap).map(([k, v]) => {
        return {key: k, value: v};
      });
      // console.log(this.dict);
    });
  }

  onchanges() {
    this.checkOnchange = !this.checkOnchange;
  }

  /*
   Created by LongNHL
   Time: 9:30 2/06/2022
   Function: prince PDF
   */
  print(yes: string) {
    this.printInvoice = yes;
  }

  generatePDF(action) {
    let docDefinition = {
      content: [
        {
          text: 'C1121G1 SHOP',
          fontSize: 16,
          alignment: 'center',
          color: '#047886'
        },
        {
          text: 'Hóa đơn mua bán di động',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: 'Chi tiết khách hàng',
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoiceDetail.customerDto.customerName,
                bold: true
              },
              {text: this.invoiceDetail.customerDto.address},
              {text: this.invoiceDetail.customerDto.email},
            ],
            [
              {
                text: `Ngày: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `No.: ${((Math.random() * 1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          text: 'Chi tiết đơn hàng',
          style: 'sectionHeader'
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              ['Sản phẩm', 'Giá tiền', 'Số lượng', 'Tổng tiền'],
              ...this.products.getRawValue().map(p => ([p.name, p.price, p.quantity, (p.price * p.quantity).toFixed(2)])),
              [{
                text: 'Total Amount',
                colSpan: 3
              }, {}, {}, this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2)]
            ]
          }
        },
        {
          text: 'Chi tiết bổ sung',
          style: 'sectionHeader'
        },
        {
          text: 'Bổ sung chi tiết',
          margin: [0, 0, 0, 15]
        },
        {
          columns: [
            [{qr: `${this.invoiceDetail.customerDto.customerName}`, fit: '50'}],
            [{text: 'Signature', alignment: 'right', italics: true}],
          ]
        },
        {
          text: 'Các điều khoản và điều kiện',
          style: 'sectionHeader'
        },
        {
          ul: [
            'Đơn hàng có thể được trả lại sau không quá 10 ngày.',
            'Việc bảo hành sản phẩm sẽ tùy thuộc vào các điều khoản và điều kiện của nhà sản xuất.',
            'Đây là hóa đơn do hệ thống tạo.',
          ],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        }
      }
    };
    if (action === 'yes') {
      pdfMake.createPdf(docDefinition).download();
    }
  }


}

