import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {Supplier} from '../../../models/supplier';
import {SecurityService} from '../../../services/security/security.service';

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
  constructor(private fb: FormBuilder, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      createdDate: [undefined, Validators.required],
      status: [true, Validators.required],
      quantity: [undefined, [Validators.required]],
      createdEmployee: [undefined, Validators.required],
      product: [undefined, Validators.required],
      supplier: [undefined, Validators.required]
    });
    this.getEmployee();
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
  get createdEmployee() {
    return this.createForm.get('createdEmployee');
  }
  get product() {
    return this.createForm.get('product');
  }
  get supplier() {
    return this.createForm.get('supplier');
  }


  receiveProduct(item: any) {
    this.productData = item;
  }

  getEmployee(){
    this.securityService.getPersonalInformation().subscribe(
      (response) => {
        console.log(response);
        this.createForm.controls.createdEmployee.setValue(response.id);
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
    if (flag){
    }
  }

  importProduct() {
    if (this.productData.id === undefined){
      this.product.setErrors({existed: 'Empty! Please input!'});
    }
    if (this.supplierData.id === undefined){
      this.supplier.setErrors({existed: 'Empty! Please input!'});
    }
  }
}
