import {Component, OnInit} from '@angular/core';
import {CustomerService} from '../../../services/customer/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-update',
  templateUrl: './customer-update.component.html',
  styleUrls: ['./customer-update.component.css']
})
export class CustomerUpdateComponent implements OnInit {

  constructor(private customerService: CustomerService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

}
