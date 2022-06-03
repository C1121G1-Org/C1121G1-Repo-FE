import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/*
  Created by KhaiTT
  Date: 10:00 02/05/2022
  Function: This class use to send and get event to reload header when login successfully.
*/
export class ShareService {

  constructor() { }

  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next();
  }

  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }
}
