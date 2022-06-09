import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../services/employee/employee.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {Positions} from '../../../models/employee/positions';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  positiones: Positions[] = [];
  imgVip = 'https://accounts.viblo.asia/assets/webpack/profile_default.0bca52a.png';
  selectedImage: any;
  errorIdCard: string;
  errorEmailEmployee: string;
  errorUserNameEmployee: string;
  errorImage: string;
  idCardFB: string;
  age: number;




  get employeeName() {
    return this.createEmployeeForm.get('employeeName');
  }

  get email() {
    return this.createEmployeeForm.get('accountDto').get('email');
  }

  get encryptPassword() {
    return this.createEmployeeForm.get('accountDto').get('encryptPassword');
  }

  get userName() {
    return this.createEmployeeForm.get('accountDto').get('userName');
  }

  get positionDto() {
    return this.createEmployeeForm.get('positionDto');
  }

  get image() {
    return this.createEmployeeForm.get('image');
  }

  get phoneNumber() {
    return this.createEmployeeForm.get('phoneNumber');
  }

  get idCard() {
    return this.createEmployeeForm.get('idCard');
  }

  get address() {
    return this.createEmployeeForm.get('address');
  }

  get dateOfBirth() {
    return this.createEmployeeForm.get('dateOfBirth');
  }

  // @ts-ignore
  createEmployeeForm: FormGroup = new FormGroup({
    // tslint:disable-next-line:max-line-length
    employeeName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(50), Validators.pattern('^([aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+)((\\s{1}[a-aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]+){1,})$')])),
    dateOfBirth: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')])),
    address: new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])),
    idCard: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9_-]{9,12}$')])),
    phoneNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern('((09|03|07|08|05)+([0-9]{8})\\b)')])),
    image: new FormControl('', Validators.compose([Validators.required])),
    positionDto: new FormControl('', Validators.compose([Validators.required])),
    accountDto: new FormGroup({
      userName: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])),
      encryptPassword: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(15)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,}){1,}$')])),
    }),
  });

  check() {
    const birthDay = new Date(this.createEmployeeForm.get('dateOfBirth').value) ;
    // @ts-ignore
    const checkDay = Math.abs(Date.now() - birthDay);
    this.age = Math.floor((checkDay / (1000 * 3600 * 24)) / 365);
    if (this.age < 18) {
      this.createEmployeeForm.get('dateOfBirth').setErrors({check: true});
    }
  }

  constructor(private router: Router,
              private employeeService: EmployeeService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  comparefn(t1: Positions, t2: Positions): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  ngOnInit(): void {
    this.getPosition();
  }

  getPosition() {
    this.employeeService.getAllPosition().subscribe(
      next => {
        // @ts-ignore
        this.positiones = next.data;
      });
  }


  submit( successBtn: HTMLButtonElement) {
    console.log(this.createEmployeeForm.value);
    const nameImg = '/EmP-' + this.createEmployeeForm.get('idCard').value + '.jpg';
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize
      (() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.createEmployeeForm.patchValue({image: url});
          this.employeeService.saveEmployee(this.createEmployeeForm.value).subscribe(() => {
            successBtn.click();
          }, error => {

            this.errorIdCard = error.error.errorMap.idCard;
            this.errorEmailEmployee = error.error.errorMap.email;
            this.errorUserNameEmployee = error.error.errorMap.userName;
            this.errorImage = error.error.errorMap.image;
          });
        });
      })
    ).subscribe();
  }
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = e => {
      console.log(e);
      this.imgVip = reader.result as string;
    };
  }
}
