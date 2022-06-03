import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router} from '@angular/router';
import {Customer} from '../../../models/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customerList: Customer[];
  private phone: string;
  private name: string;
  public idClick: number;

  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  collection: any[] = this.customerList;

  ngOnInit(): void {
    this.customerService.getAllCustomer(name, this.phone).subscribe((data: any) => {
      this.customerList = data.content;
      console.log(this.customerList);
    });

  }

  sendId(id: number, e) {
    this.idClick = id;
    e.target.style.background = 'blueviolet';
  }
}
