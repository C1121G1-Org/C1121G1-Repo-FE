import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
export class StorageCreateComponent implements OnInit {
  createForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm = this.fb.group({
      createdDate: [],
      status: [],
      quantity: [],
      createdEmployee: [],
      product: [],
      supplier: []
    });
  }

  receiveItem(item: any) {
    console.log(item);
  }

  receiveFlag(item: any) {
    console.log(item);
  }
}
