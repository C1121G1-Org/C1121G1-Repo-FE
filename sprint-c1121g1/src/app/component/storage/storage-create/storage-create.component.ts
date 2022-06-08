import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {Supplier} from '../../../models/supplier';
import {SecurityService} from '../../../services/security/security.service';
import {gteQuantityStorage} from '../../../services/storage/gte-quantity-storage';
import {Router} from '@angular/router';
import {StorageService} from '../../../services/storage/storage.service';

declare var $: any;

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})

/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Component: StorageCreateComponent
  Function: all function
*/

export class StorageCreateComponent implements OnInit {
  createForm: FormGroup;
  productData: Product = {};
  supplierData: Supplier = {};
  today: string;
  check = false;
  image = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';

  @ViewChild('btnSuccess') btnSuccess: any;
  @ViewChild('btnFailed') btnFailed: any;

  constructor(private fb: FormBuilder, private securityService: SecurityService, private router: Router,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.getToday();
    this.createForm = this.fb.group({
      createdDate: [this.today, Validators.required],
      status: [true, Validators.required],
      quantity: [undefined, [Validators.required, gteQuantityStorage]],
      createdEmployeeDto: [undefined, Validators.required],
      productDto: [undefined, Validators.required],
      supplierDto: [undefined, Validators.required]
    });
    this.getEmployee();
    // tslint:disable-next-line:triple-equals
    console.log(this.productData.toString().length === 1);
    console.log(this.productData);
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

  getToday() {
    const todayTemp = new Date();
    const todayDate = todayTemp.getDate();
    let todayDateString = todayTemp.getDate().toString();
    const todayMonth = todayTemp.getMonth() + 1;
    let todayMonthString = (todayTemp.getMonth() + 1).toString();
    const todayFullYear = todayTemp.getFullYear();
    if (todayMonth < 9) {
      todayDateString = `0${todayMonth}`;
    }
    if (todayDate < 10) {
      todayMonthString = `0${todayDate}`;
    }
    this.today = `${todayFullYear}-${todayMonthString}-${todayDateString}`;
  }

  receiveProduct(item: any) {
    console.log(this.productData);
    this.productData = item;
    this.image = this.productData.image;
  }

  getEmployee() {
    this.securityService.getPersonalInformation().subscribe(
      (response) => {
        console.log(response);
        this.createForm.controls.createdEmployeeDto.setValue(response.id);
      },
      (error) => {
        alert('FAILED');
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
    console.log(this.createForm);
    if (this.createForm.invalid) {
      if (this.productData.id === undefined) {
        this.productDto.setErrors({existed: true, message: 'Hãy chọn Sản phẩm'});
      }
      if (this.supplierData.id === undefined) {
        this.supplierDto.setErrors({existed: true, message: 'Hãy chọn Nhà cung cấp'});
      }
      if (this.quantity.value === null) {
        this.quantity.setErrors({empty: true, message: 'Hãy nhập số lượng của sản phẩm'});
      }
      this.router.navigateByUrl('/storage/create');
    } else {
      this.storageService.create(this.createForm.value).subscribe(
        (response) => {
          console.log(response);
          this.btnSuccess.nativeElement.click();
        },
        (error) => {
          this.btnFailed.nativeElement.click();
        }
      );
    }

  }

  checkOnchanges() {
    this.check = !this.check;
  }
}

