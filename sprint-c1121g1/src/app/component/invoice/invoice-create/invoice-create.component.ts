import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product/product.service";
import {ProductInvoice} from "../../../dto/productInvoice";
import {InvoiceDetail} from "../../../dto/InvoiceDetail";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {error} from "@angular/compiler/src/util";

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


  currentProduct: Product;

  productList: Product[] = [];
  selectedProduct: Product;
  invoiceDetail: InvoiceDetail;
  printInvoice: string;
  money: string;

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
        gender: this.fb.control('', [Validators.required]),
      }),
      products: this.fb.array(this.productList.map(product => this.createProducts(product))
      ),
    });

  }


  ngOnInit(): void {
    this.getAllProduct();
  }

  private createProducts(product: any) {
    return this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      quantity: ['', [Validators.required]]
    });
  }

  get products() {
    return <FormArray> this.invoiceForm.get('products');
  }

  get customerDto() {
    return < FormGroup>this.invoiceForm.get('customerForm');
  }


  deleteProduct(i: number) {
    this.products.removeAt(i);
  }

  getProduct(product: Product) {
    this.currentProduct = product;
  }

  getTotalMoney() {
    this.money = this.products.getRawValue().reduce((sum, p) => sum + (p.quantity * p.price), 0).toFixed(2);
  }

  getAllProduct() {
    this.productService.getAll().subscribe(data => {
      this.productList = data;
    });
  }

  isSelectedProduct(product: Product) {
    this.selectedProduct = product;
    // console.log(this.selectedProduct);
    // tslint:disable-next-line:triple-equals
    if (!this.currentProduct) {
      return false;
    }
    return this.currentProduct.name === this.selectedProduct.name ? true : false;
  }

  //
  chooseProduct() {
    const productForm = this.createProducts(this.currentProduct);
    console.log(productForm);
    this.products.push(productForm);
    console.log(this.products.getRawValue());
  }


  createInvoice() {
    if (this.printInvoice == 'yes') {
      this.generatePDF('yes');
    }
    this.invoiceDetail = this.invoiceForm.value;
    this.invoiceDetail.totalMoney = this.money;
    console.log(this.invoiceDetail);
    console.log(this.print);
    this.invoiceService.updateQuantity(this.invoiceDetail).subscribe(() => {
      this.invoiceService.createInvoice(this.invoiceDetail).subscribe(() => {
        this.invoiceForm.reset();
        alert('thêm mới thành công');
        if (this.printInvoice === 'yes') {
          this.generatePDF('yes');
        }
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error)
    });

  }


  /*
   Created by LongNHL
   Time: 9:30 2/06/2022
   Function: prince PDF
   */
  docDefinition: any;
  generatePDF(action) {
    this.docDefinition = {
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
                text: this.invoiceForm.getRawValue().customerName,
                bold: true
              },
              {text: this.invoiceForm.getRawValue().address},
              {text: this.invoiceForm.getRawValue().email},
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
              ['Product', 'Price', 'Quantity', 'Amount'],
              ...this.products.getRawValue().map(p => ([p.name, p.price, p.qty, (p.price * p.quantity).toFixed(2)])),
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
            [{qr: `${this.invoiceForm.getRawValue().customerName}`, fit: '50'}],
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
      pdfMake.createPdf(this.docDefinition).download();
    }
  }

  print(yes: string) {
    this.printInvoice = yes;
  }


}
