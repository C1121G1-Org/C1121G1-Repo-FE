import {Component, OnInit} from '@angular/core';
import {InvoiceDto} from "../../../dto/invoiceDto";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {CustomerDto} from "../../../dto/customerDto";
import {InvoiceService} from "../../../services/invoice/invoice.service";
import {ProductInvoiceDto} from "../../../dto/productInvoiceDto";
import {Product} from "../../../models/product";
import {InvoiceDetailDto} from "../../../dto/invoiceDetailDto";
import {ProductService} from "../../../services/product/product.service";
import validate = WebAssembly.validate;


@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css']
})
export class InvoiceCreateComponent implements OnInit {
  invoiceDetail = new InvoiceDetailDto();
  invoice: InvoiceDto = new InvoiceDto();
  totalMoney: string;
  payments: string;
  customer: CustomerDto;
  productInvoice: ProductInvoiceDto;


  fromCustomer: FormGroup = new FormGroup({
    id: new FormControl(),
    customerName: new FormControl('',Validators.required),
    phoneNumber: new FormControl('',Validators.required),
    dateOfBirth: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    gender: new FormControl('',Validators.required)
  });


  products = new FormArray([])

  addProduct (){
    const productAdd = new FormGroup({
      id : new FormControl(this.selectedProduct.id),
      new : new FormControl(this.selectedProduct.id),
      name: new FormControl(this.selectedProduct.name,Validators.required),
      quantity: new FormControl(""),
    });
    this
  }


  get id() {
    return this.fromCustomer.get('id');
  }
  get customerName() {
    return this.fromCustomer.get('customerName');
  }
  get phoneNumber() {
    return this.fromCustomer.get('phoneNumber');
  }
  get dateOfBirth() {
    return this.fromCustomer.get('dateOfBirth');
  }
  get email() {
    return this.fromCustomer.get('email');
  }
  get address() {
    return this.fromCustomer.get('address');
  }
  get gender() {
    return this.fromCustomer.get('gender');
  }

  /*
      Created by TamHT
      Time: 14:15 1/06/2022
      Function: delete product
  */
   currentProduct:  Product;
  productList: Product[] = []
   selectedProduct: Product;




  constructor(private invoiceService: InvoiceService,
              private productService: ProductService) {
  }


  ngOnInit(): void {
    this.getAllProduct();
  }

  private getAllProduct() {
    this.productService.getAll().subscribe(data => {
      this.productList = data;
    });
  }

  removeProduct(i: number) {

  }


  getTotalMoney(quantity: number) {
    this.productInvoice.quantity = quantity
    this.totalMoney =  this.invoiceDetail.productInvoiceDtoList.reduce((sum, p)=> sum + (p.quantity * p.product.price), 0).toFixed(2);
    this.invoice.totalMoney = parseInt(this.totalMoney);
    console.log(this.totalMoney);
  }


  getCustomer() {
    this.customer = this.fromCustomer.value;
    if (this.fromCustomer.value.gender == 1){
      this.customer.gender = true;
    }else {
      this.customer.gender = false;
    }

    console.log(this.customer);
  }

  create(submitCustomer: HTMLButtonElement) {
      submitCustomer.click();


    // this.invoiceService.createInvoice(this.invoice).subscribe(() => {
    //   alert("ok")
    // }, error => {
    //   console.log(error)
    // });
  }



  /*
     Created by TamHT
     Time: 14:15 1/06/2022
     Function: delete product
 */
  getProduct(product: Product) {
    this.currentProduct = product;
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

  chooseProduct() {
    console.log("hehe")
    this.addProduct();
    console.log(this.selectedProduct)
  }


}
