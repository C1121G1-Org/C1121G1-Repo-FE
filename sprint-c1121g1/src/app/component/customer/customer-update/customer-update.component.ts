import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../models/customer';
import {CustomerDto} from '../../../dto/customer-dto';
// @ts-ignore
import {DatePipe} from '@angular/common';
import {async} from 'rxjs/internal/scheduler/async';


@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {
  editForm: FormGroup;
  id: number;
  customer: Customer;
  customerDto: CustomerDto;
  pipe = new DatePipe('en-US');
  name = '';
  phone = '';
  page = 0;
  totalElement = 0;
  flag = false;

  constructor(private customerService: CustomerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      customerName: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^([A-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\\s{1}[A-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(090\\d{7})|(091\\d{7})|(\\(\\+84\\)90\\d{7})|(\\(\\+84\\)91\\d{7})$')]),
      dateOfBirth: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{1,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,}){1,}$')]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.flag = false;
    this.customerService.getAllCustomer1(this.name, this.phone, this.page).subscribe(
      (data: any) => {
        this.totalElement = data.totalElements;
        this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
          this.id = +paramMap.get('id');
        });
        if (this.id < 0 || this.id > this.totalElement) {
          this.router.navigate(['error']);
        } else {
          this.customerService.findById(this.id).subscribe((data1: any) => {
            this.customerDto = data1;
            this.editForm.patchValue(this.customerDto);
            const editDate: string = this.parseDateForm(this.customerDto.dateOfBirth);
            this.editForm.get('dateOfBirth').patchValue(editDate);
            console.log(this.editForm);
          });
        }
      });
  }

  /*
    Created By hoangDH,
    Time: 12:38 PM 2022-06-06
    Function: parse Date to form edit
    */
  parseDateForm(date: string): string {
    const editDate: Date = new Date(date);
    const editDate2 = this.pipe.transform(editDate, 'yyyy-MM-dd');
    return editDate2;
  }

  /*
    Created By hoangDH,
    Time: 12:38 PM 2022-06-06
    Function: parse Date to data
    */

  parseDateData(date: string): string {
    const editDate: Date = new Date(date);
    const editDate2 = this.pipe.transform(editDate, 'dd-MM-yyyy');
    return editDate2;
  }


  /*
    Created By hoangDH,
    Time: 12:38 PM 2022-06-06
    Function: updateCustomer
    */
  updateCustomer(id: number, openSuccessModalBtn: HTMLButtonElement, errorModalBtn: HTMLButtonElement) {
    if (this.editForm.invalid) {
      /*console.log(this.editForm);*/
      errorModalBtn.click();
      /*alert(this.editForm.get('dateOfBirth').value);
      for (const el in this.editForm.controls) {
        if (this.editForm.controls[el].errors) {
          console.log(el);
        }
      }*/
    } else {
      /*const editDate: string = this.parseDateForm(this.editForm.get('dateOfBirth').value);
      alert(editDate);
      this.editForm.get('dateOfBirth').patchValue(this.parseDateData(editDate));*/
      const customer = this.editForm.value;
      this.customerService.updateCustomer(id, customer).subscribe(async res => {
        openSuccessModalBtn.click();
        /*await this.wait(3000);
        if (this.flag == false){
          openSuccessModalBtn.click();
        }
        this.router.navigate(['/customer/list']);*/
      }, e => {
        errorModalBtn.click();
        console.log(e);
      });
    }
  }

  wait(ms){
    return new Promise(r => setTimeout(r, ms));
  }




  checkConfirm() {
    this.flag = true;
  }
}
