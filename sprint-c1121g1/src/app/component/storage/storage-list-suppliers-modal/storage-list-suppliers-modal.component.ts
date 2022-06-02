import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-storage-list-suppliers-modal',
  templateUrl: './storage-list-suppliers-modal.component.html',
  styleUrls: ['./storage-list-suppliers-modal.component.css']
})
export class StorageListSuppliersModalComponent implements OnInit {
  list: any = [{id: 1, name: 'a'}, {id: 2, name: 'b'}, {id: 3, name: 'c'}, {id: 4, name: 'd'}, {id: 5, name: 'e'}, {id: 6, name: 'f'}];
  chosenItem: any;
  flag = false;
  errorMessage: string;
  @Output() itemOutput = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  getItem(item: any) {
    this.chosenItem = item;
    this.flag = !this.flag;
  }

  sendItem() {
    if (this.flag) {
      this.itemOutput.emit(this.chosenItem);
    }
  }
}
