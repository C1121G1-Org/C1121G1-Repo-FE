import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

import {ProductService} from "../../../services/product/product.service";
import {ProductInvoice} from "../../../dto/productInvoice";
import {InvoiceDetail} from "../../../dto/InvoiceDetail";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {ICustomer} from "../../../models/ICustomer";
import {IProduct} from "../../../models/iProduct";

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
  checkOnChange = false;

  invoiceForm: FormGroup;


  currentProduct: IProduct;
  customer: ICustomer = {};
  productList: IProduct[] = [];
  invoiceDetail: InvoiceDetail;
  printInvoice: string;
  money: string;
  disableFlag: boolean = false;
  errorMap: any = {};
  public dict: { key, value }[];


  constructor(private fb: FormBuilder,
              private productService: ProductService,
              private invoiceService: InvoiceService) {
    this.invoiceForm = this.fb.group({
      payments: this.fb.control('', [Validators.required]),
      totalMoney: this.fb.control('', [Validators.required]),
      customerDto: this.fb.group({
        id: this.fb.control(''),
        customerName: this.fb.control('', [Validators.required]),
        phoneNumber: this.fb.control('', [Validators.required]),
        dateOfBirth: this.fb.control('', [Validators.required]),
        address: this.fb.control('', [Validators.required]),
        email: this.fb.control('', [Validators.required]),
        gender: this.fb.control(true, [Validators.required]),
      }),
      products: this.fb.array(this.productList.map(product => this.createProducts(product))
      ),
    });

  }

  ngOnInit(): void {
    this.getAllProduct();
  }

  private createProducts(product: ProductInvoice) {
    return this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      quantity: ['', [Validators.required, Validators.pattern(/^\d+\.?\d*$/)]]
    });
  }


  chooseProduct() {
    let productForm = this.createProducts(this.currentProduct)
    this.products.push(productForm);
    this.errorMap["productList"] = null;
  }


  get products() {
    return <FormArray>this.invoiceForm.get('products')
  }

  get customerDto() {
    return <FormGroup>this.invoiceForm.get('customerForm')
  }


  deleteProduct(i: number, length: number) {
    this.products.removeAt(i);
    if (length <= 1) {
      this.money = null;
    }else {
      this.money = this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2);
    }
  }


  getTotalMoney() {
    this.money = this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2);
    if (isNaN(parseInt(this.money)) || parseInt(this.money) <= 0){
      this.money = null;
    }

  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      this.productList = data;
    }, error => {
      console.log(error())
    });
  }


  createInvoice() {
    this.invoiceDetail = this.invoiceForm.value;
    this.invoiceDetail.totalMoney = this.money;
    console.log(this.invoiceDetail);
    console.log(this.print);
    this.invoiceService.updateQuantity(this.invoiceDetail).subscribe((message) => {
      this.invoiceService.createInvoice(this.invoiceDetail).subscribe(() => {
        this.money = null;
        alert("thêm mới thành công")
        if (this.printInvoice === 'yes') {
          console.log("in")
          this.generatePDF('yes',);
        }
        this.invoiceForm.reset();
      }, error => {
        console.log(error);
      })
    }, error => {
      // console.log(error)
      this.errorMap = error.error.errorMap;

      // console.log(this.errorMap);
      console.log(this.errorMap["products.quantity"]);
      // this.dict = Object.entries(error.error.errorMap).map(([k, v]) => {
      //   return {key: k, value: v};
      // });
      // console.log(this.dict)
    });
  }

  print(yes: string) {
    this.printInvoice = yes;
  }


  getProductQR(productQR: any) {
    this.currentProduct = productQR;
    this.chooseProduct();
  }

  getProductModal(productModal: any) {
    this.currentProduct = productModal
    this.chooseProduct();

  }

  getCustomerModal(customerModal: any) {
    this.customer = customerModal;
    if (this.customer != null) {
      this.disableFlag = true;
    }
    this.chooseCustomer();
  }


  private chooseCustomer() {
    let customerForm = this.createCustomer(this.customer)
    console.log(customerForm)
    this.invoiceForm.controls.customerDto.patchValue(customerForm.value);
    console.log(this.products.getRawValue());
  }

  private createCustomer(customer: ICustomer) {
    return this.fb.group({
      id: [customer.id],
      customerName: [customer.customerName, Validators.required],
      address: [customer.address],
      email: [customer.email],
      phoneNumber: [customer.phoneNumber],
      dateOfBirth: [customer.dateOfBirth],
      gender: [customer.gender]
    });
  }

  disableForm() {
    this.disableFlag = true;
  }

  /*
   Created by LongNHL
   Time: 9:30 2/06/2022
   Function: prince PDF
   */

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

  checkOnchanges() {
    this.checkOnChange = !this.checkOnChange;
  }
}
