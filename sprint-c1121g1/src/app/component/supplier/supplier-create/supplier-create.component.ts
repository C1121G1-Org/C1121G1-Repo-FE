import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {Supplier} from '../../../models/supplier';
import {SupplierDto} from '../../../dto/supllierDto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-supplier-create',
  templateUrl: './supplier-create.component.html',
  styleUrls: ['./supplier-create.component.css']
})
/*
    Created by NgocTTB
    Time: 09:00 03/06/2022
    Function: Create Supplier
    */
export class SupplierCreateComponent implements OnInit {
  supplierSave: Supplier;
  supplierDtoSave: SupplierDto;
  errorSupplierName: string;
  errorEmail: string;

  supplierForm: FormGroup = new FormGroup({
    supplierName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(090\\d{7})|(091\\d{7})|(\\(\\+84\\)90\\d{7})|(\\(\\+84\\)91\\d{7})$')]),
    email: new FormControl('', [Validators.required , Validators.email]),
  });
  constructor(private supplierService: SupplierService,
              private router: Router) { }

  ngOnInit(): void {
  }

  submit(errorBtn: HTMLButtonElement, successBtn: HTMLButtonElement) {
    this.errorSupplierName = '';
    if (this.supplierForm.valid){
      this.supplierDtoSave = this.supplierForm.value;
      this.supplierDtoSave.deleteFlag = false;
      console.log(this.supplierSave);
      this.supplierSave = this.supplierDtoSave;
      this.supplierService.save(this.supplierSave).subscribe(() => {
        successBtn.click();
        this.supplierForm.reset();
      }, error => {
        this.errorSupplierName = error.error.errorMap.supplierName;
        this.errorEmail = error.error.errorMap.email;
      });
    }else {
      errorBtn.click();
    }
  }
}
