import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../../../services/security/security.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';
import {finalize} from 'rxjs/operators';

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
    employeeName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)((\\s{1}[a-aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+){1,})$')]),
    idCard: new FormControl('', [Validators.required, Validators.pattern('^((\\d{9})|(\\d{12}))$')]),
    dateOfBirth: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,}){1,}$')]),
    address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.pattern('^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)((\\s{1}[a-aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+){1,})$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]),
    image: new FormControl(),
  });
  imageLink: string;
  imagePath: any;
  spinFlag = false;
  updateFlag = true;
  constructor(private securityService: SecurityService, private fireStorage: AngularFireStorage) {
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
      this.personalInformationForm.patchValue(res);
      this.personalInformationForm.controls.email.setValue(res.account.email);
      this.imageLink = this.personalInformationForm.controls.image.value;
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    });
  }

  update(openSuccessModalBtn: HTMLButtonElement, closeModalBtn: HTMLButtonElement,
         errorModalBtn: HTMLButtonElement, closeErrorModal: HTMLButtonElement) {
    if (!this.updateFlag) {
      const filePath = this.personalInformationForm.controls.employeeName.value +  '-ava-' + this.getCurrentDateTime();
      const fileRef = this.fireStorage.ref(filePath);
      this.fireStorage.upload(filePath, this.imagePath).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.personalInformationForm.controls.image.setValue(url);
            this.imageLink = url;
            const personalInformation = this.personalInformationForm.value;
            this.securityService.updatePersonalInformation(personalInformation).subscribe(res => {
              openSuccessModalBtn.click();
              this.spinFlag = false;
              // tslint:disable-next-line:only-arrow-functions
              setTimeout(function(){
                closeModalBtn.click();
                window.location.reload();
              }, 5000);
            }, error => {
              errorModalBtn.click();
            });
          });
        })
      ).subscribe();
    }
    if (this.updateFlag) {
      const personalInformation = this.personalInformationForm.value;
      this.securityService.updatePersonalInformation(personalInformation).subscribe(res => {
        openSuccessModalBtn.click();
        this.spinFlag = false;
        // tslint:disable-next-line:only-arrow-functions
        setTimeout(function(){
          closeModalBtn.click();
          window.location.reload();
        }, 5000);
      }, error => {
        console.log(error);
        errorModalBtn.click();
      });
    }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'yyyy-mm-dd hh:mm:ss', 'en-US');
  }

  showReview(event: any) {
    this.imagePath = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imagePath);
    reader.onload = e => {
      this.imageLink = reader.result as string;
    };
    this.updateFlag = false;
  }

  changeSpinFlag() {
    this.spinFlag = true;
  }

  refresh() {
    window.location.reload();
  }
}
