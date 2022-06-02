import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storage-create',
  templateUrl: './storage-create.component.html',
  styleUrls: ['./storage-create.component.css']
})
export class StorageCreateComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  receiveItem(item: any) {
    console.log(item);
  }
}
