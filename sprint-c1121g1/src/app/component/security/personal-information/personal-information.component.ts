import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../../services/security/security.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
/*
  Created by KhaiTT
  Date: 10:47 03/05/2022
  Function: This class use to change personal information.
*/
export class PersonalInformationComponent implements OnInit {
  personalInformationForm: FormGroup = new FormGroup({
    id: new FormControl(),
    employeeName: new FormControl('', [Validators.required]),
    idCard: new FormControl(),
    dateOfBirth: new FormControl('', [Validators.required]),
    email: new FormControl(),
    address: new FormControl(),
    phoneNumber: new FormControl(),
    image: new FormControl(),
  });
  imageLink: string;
  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {
    this.getPersonalInformation();
  }

  get employeeName() {
    return this.personalInformationForm.get('employeeName');
  }

  get idCard() {
    return this.personalInformationForm.get('idCard');
  }

  get dateOfBirth() {
    return this.personalInformationForm.get('dateOfBirth');
  }

  get email() {
    return this.personalInformationForm.get('email');
  }

  get address() {
    return this.personalInformationForm.get('address');
  }

  get phoneNumber() {
    return this.personalInformationForm.get('phoneNumber');
  }

  getPersonalInformation() {
    this.securityService.getPersonalInformation().subscribe(res => {
      console.log(res);
      this.personalInformationForm.patchValue(res);
      this.personalInformationForm.controls.email.setValue(res.account.email);
      this.imageLink = this.personalInformationForm.controls.image.value;
    }, error => {
      console.log(error);
    });
  }

  update(openSuccessModalBtn: HTMLButtonElement, closeModalBtn: HTMLButtonElement) {
    const personalInformation = this.personalInformationForm.value;
    this.securityService.updatePersonalInformation(personalInformation).subscribe(res => {
      openSuccessModalBtn.click();
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function(){
        closeModalBtn.click();
      }, 5000);
    }, error => {
      console.log('error ne');
    });
  }
}
