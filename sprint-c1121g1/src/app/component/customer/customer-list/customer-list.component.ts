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

  constructor(private customerService: CustomerService,
              private router: Router) {
  }


  ngOnInit(): void {}
   /* this.customerService.getAllCustomer().subscribe(data => {
      this.customerList = data.content;

    });*/
  }
