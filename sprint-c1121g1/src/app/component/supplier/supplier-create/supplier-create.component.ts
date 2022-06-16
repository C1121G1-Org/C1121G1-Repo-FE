
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SupplierService} from '../../../services/supplier/supplier.service';
import {Supplier} from '../../../models/supplier';
import {SupplierDto} from '../../../dto/supllierDto';
import {Router} from '@angular/router';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';

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
  check = false;

  supplierForm: FormGroup = new FormGroup({
    supplierName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern('^(09)[0-9]{8}$')]),
    email: new FormControl('', [Validators.required , Validators.email]),
  });
  constructor(private supplierService: SupplierService,
              private router: Router) { }

  ngOnInit(): void {
  }

  howMessageSuccess(){
    const that = this;
    this.check = true;

    setTimeout(() => {
      that.check = false;
    }, 4000);

  }

  submit(errorBtn: HTMLButtonElement, successBtn: HTMLButtonElement) {
    this.errorSupplierName = '';
    this.errorEmail = '';
    if (this.supplierForm.valid){
      this.supplierDtoSave = this.supplierForm.value;
      this.supplierDtoSave.deleteFlag = false;
      this.supplierSave = this.supplierDtoSave;
      this.supplierService.save(this.supplierSave).subscribe(() => {
        console.log(this.supplierForm.value);
        successBtn.click();
        this.supplierForm.reset();
      }, error => {
        console.log('Failed');
        this.check = true;
        this.errorSupplierName = error.error.errorMap.supplierName;
        this.errorEmail = error.error.errorMap.email;
        this.howMessageSuccess();
      });
    }else {
      errorBtn.click();
    }
  }

}
