import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-reset-pasword',
  templateUrl: './reset-pasword.component.html',
  styleUrls: ['./reset-pasword.component.css']
})
export class ResetPaswordComponent implements OnInit {
  changePasswordForm: FormGroup = new FormGroup({
    newPassword: new FormControl(),
    comfirmNewPassword: new FormControl()
  });
  constructor() { }

  ngOnInit(): void {
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get comfirmNewPassword() {
    return this.changePasswordForm.get('comfirmNewPassword');
  }

}
