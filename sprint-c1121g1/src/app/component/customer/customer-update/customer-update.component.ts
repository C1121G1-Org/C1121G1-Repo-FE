import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Customer} from '../../../models/customer';
import {CustomerDto} from '../../../dto/customer-dto';
import {DatePipe} from '@angular/common';
import {log} from 'util';


@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  /*id: number;
  customerName: string;
  phoneNumber: string;
  dateOfBirth: string;
  email: string;
  address: string;
  gender: boolean;*/
  editForm: FormGroup;
  id: number;
  customer: Customer;
  customerDto: CustomerDto;
  pipe = new DatePipe('en-US');
  todayWithPipe = null;

  constructor(private customerService: CustomerService,
              private router: Router,
              private activeRoute: ActivatedRoute) {
    this.editForm = new FormGroup({
      id: new FormControl(''),
      customerName: new FormControl('', [Validators.required, Validators.pattern('^([^0-9]*)$')]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(84|0)+(9[0|1])+([0-9]{7})')]),
      dateOfBirth: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,}){1,}$')]),
      address: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });


  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
    });
    this.customerService.findById(this.id).subscribe((data: any) => {
      this.customerDto = data;
      this.editForm.patchValue(this.customerDto);
      const editDate: string = this.parseDateForm(this.customerDto.dateOfBirth);
      this.editForm.get('dateOfBirth').patchValue(editDate);
      console.log(this.editForm);

    });
  }

  parseDateForm(date: string): string {
    const editDate: Date = new Date(date);
    const editDate2 = this.pipe.transform(editDate, 'yyyy-MM-dd');
    return editDate2;
  }
  parseDateData(date: string): string {
    const editDate: Date = new Date(date);
    const editDate2 = this.pipe.transform(editDate, 'dd-MM-yyyy');
    return editDate2;
  }



  updateCustomer(id: number) {
    if (this.editForm.invalid ) {
      console.log(this.editForm);
      alert(this.editForm.get('dateOfBirth').value);
      for (const el in this.editForm.controls) {
        if (this.editForm.controls[el].errors) {
          console.log(el);
        }
      }
    } else {
      const editDate: string = this.parseDateForm(this.editForm.get('dateOfBirth').value);
      this.editForm.get('dateOfBirth').patchValue(this.parseDateData(editDate));
      const customer = this.editForm.value;
      console.log(customer);
      this.customerService.updateCustomer(id, customer).subscribe(() => {
        this.router.navigate(['/customer/list']);
        alert('Cập nhật thành công');
      }, e => {
        console.log(e);
      });
    }
  }

  testClick() {
    alert(this.id);
  }
}
