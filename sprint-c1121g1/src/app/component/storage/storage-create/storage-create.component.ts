import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {Supplier} from '../../../models/supplier';
import {SecurityService} from '../../../services/security/security.service';
import {gteQuantityStorage} from '../../../services/storage/gte-quantity-storage';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage/storage.service';
import {gteValidateDate} from '../../../services/storage/gte-validate-date';
import {Employee} from '../../../models/employee';
declare var $: any;
@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
/*
  Created by khoaVC
  Role: Admin, Storekeeper
  Time: 10:00 03/06/2022
  Component: StorageCreateComponent
  Function: all function
*/
export class StorageCreateComponent implements OnInit {
  createForm: FormGroup;
  productData: Product = {};
  supplierData: Supplier = {};
  employeeData: Employee = {};
  today: string;
  image = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';
  check: boolean;
  @ViewChild('btnSuccess', {static: true}) btnSuccess: ElementRef;
  @ViewChild('btnFailed', {static: true}) btnFailed: ElementRef;
  constructor(private fb: FormBuilder, private securityService: SecurityService, private router: Router,
              private storageService: StorageService) {
  }
  ngOnInit(): void {
    this.getToday();
    this.createForm = this.fb.group({
      createdDate: [this.today, [Validators.required, gteValidateDate]],
      status: [true, Validators.required],
      quantity: [undefined, [Validators.required, gteQuantityStorage]],
      createdEmployeeDto: [undefined, Validators.required],
      productDto: [undefined, Validators.required],
      supplierDto: [undefined, Validators.required]
    });
    this.getEmployee();
    this.productData = {};
    this.supplierData = {};
    this.image = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';
  }
  get createdDate() {
    return this.createForm.get('createdDate');
  }
  get status() {
    return this.createForm.get('status');
  }
  get quantity() {
    return this.createForm.get('quantity');
  }
  get createdEmployeeDto() {
    return this.createForm.get('createdEmployeeDto');
  }
  get productDto() {
    return this.createForm.get('productDto');
  }
  get supplierDto() {
    return this.createForm.get('supplierDto');
  }
  // GET TODAY
  getToday() {
    const todayTemp = new Date();
    const todayDate = todayTemp.getUTCDate();
    const todayMonth = todayTemp.getUTCMonth() + 1;
    const todayFullYear = todayTemp.getUTCFullYear();
    let todayDateString: any;
    let todayMonthString: any;
    if (todayDate < 10) {
      todayDateString = '0' + todayDate;
    } else {
      todayDateString = todayDate;
    }
    if (todayMonth < 10) {
      todayMonthString = '0' + todayMonth;
    } else {
      todayMonthString = todayMonth;
    }
    this.today = todayFullYear + '-' + todayMonthString + '-' + todayDateString;
  }
  receiveProduct(item: any) {
    this.productData = item;
    this.image = this.productData.image;
  }
  getEmployee() {
    this.securityService.getPersonalInformation().subscribe(
      (response) => {
        this.employeeData = response;
        this.createForm.controls.createdEmployeeDto.setValue(this.employeeData.id);
      },
      (error) => {
        this.btnFailed.nativeElement.click();
      }
    );
  }
  receiveProductFlag(flag: any) {
    // if (flag){
    //   this.securityService.getPersonalInformation().subscribe(
    //     (response) => {
    //       console.log(response);
    //       this.createForm.controls.createdEmployee.setValue(response.id);
    //     },
    //     (error) => {
    //       alert('FAILED');
    //     }
    //     );
    // }
  }
  receiveSupplier(item: any) {
    this.supplierData = item;
  }
  receiveSupplierFlag(flag: any) {
    if (flag) {
    }
  }
  importProduct() {
    console.log(this.createForm.value);
    if (this.createForm.invalid) {
      if (this.productData.id === undefined) {
        this.productDto.setErrors({existed: true, message: 'Hãy chọn sản phẩm.'});
      }
      if (this.supplierData.id === undefined) {
        this.supplierDto.setErrors({existed: true, message: 'Hãy chọn nhà cung cấp.'});
      }
      if (this.quantity.value === null) {
        this.quantity.setErrors({empty: true, message: 'Hãy nhập số lượng của sản phẩm.'});
      }
      this.router.navigateByUrl('/storage/create');
    } else {
      this.storageService.create(this.createForm.value).subscribe(
        (response) => {
          this.btnSuccess.nativeElement.click();
          this.ngOnInit();
        },
        (error) => {
          this.btnFailed.nativeElement.click();
        }
      );
    }
  }
  checkOnChange() {
    this.check = !this.check;
  }
}
