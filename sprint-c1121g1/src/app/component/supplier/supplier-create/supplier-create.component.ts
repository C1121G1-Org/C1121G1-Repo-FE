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
export class SupplierCreateComponent implements OnInit {
  supplierSave: Supplier;
  supplierDtoSave: SupplierDto;
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
    if (this.supplierForm.valid){
      console.log('hhi');
      this.supplierDtoSave = this.supplierForm.value;
      this.supplierDtoSave.deleteFlag = false;
      console.log(this.supplierSave);
      this.supplierSave = this.supplierDtoSave;
      this.supplierService.save(this.supplierSave).subscribe(() => {
        successBtn.click();
        this.supplierForm.reset();
        });
    }else {
      console.log('haha');
      errorBtn.click();
    }

  }

}
