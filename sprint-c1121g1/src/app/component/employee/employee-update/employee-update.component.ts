import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Positions} from '../../../models/employee/positions';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {EmployeeService} from '../../../services/employee/employee.service';
import {finalize} from 'rxjs/operators';
import {AngularFireStorage} from '@angular/fire/storage';
import {formatDate} from '@angular/common';


// @ts-ignore
// @ts-ignore
// @ts-ignore
@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  editEmployeeForm: FormGroup;
  id: number;
  positiones: Positions[] = [];
  selectedImage: any;
  imgVip = '';
  errorIdCard: string ;
  errorEmailEmployee: string;
  errorUserNameEmployee: string;
  age: number;

  // @ts-ignore
  // @ts-ignore
  constructor(private employeeService: EmployeeService,
              private activetedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.activetedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getEmployeeDto(this.id);
    });
  }
  check() {
    const birthDay = new Date(this.editEmployeeForm.get('dateOfBirth').value) ;
    // @ts-ignore
    const checkDay = Math.abs(Date.now() - birthDay);
    this.age = Math.floor((checkDay / (1000 * 3600 * 24)) / 365);
    if (this.age < 18) {
      this.editEmployeeForm.get('dateOfBirth').setErrors({check: true});
    }
  }

  ngOnInit(): void {
    this.employeeService.getAllPosition().subscribe(
      next => {
        // @ts-ignore
        this.positiones = next.data;
      });
  }

  comparefn(t1: Positions, t2: Positions): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }

  getEmployeeDto(id: number) {
    return this.employeeService.findById(id).subscribe(next => {
      console.log(next);
      this.editEmployeeForm = new FormGroup({
        // tslint:disable-next-line:max-line-length
        id: new FormControl(next.id),
        // tslint:disable-next-line:max-line-length
        employeeName: new FormControl(next.employeeName, Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(50), Validators.pattern('^([a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+)((\\s{1}[a-vxyỳọáầảấờễàạằệếýộậốũứĩõúữịỗìềểẩớặòùồợãụủíỹắẫựỉỏừỷởóéửỵẳẹèẽổẵẻỡơôưăêâđ]+){1,})$')])),
        dateOfBirth: new FormControl(next.dateOfBirth, Validators.compose([Validators.required, Validators.pattern('^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$')])),
        // tslint:disable-next-line:max-line-length
        address: new FormControl(next.address, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100)])),
        idCard: new FormControl(next.idCard, Validators.compose([Validators.required, Validators.pattern('^[0-9_-]{9,12}$')])),
        phoneNumber: new FormControl(next.phoneNumber, Validators.compose([Validators.required, Validators.pattern('((09|03|07|08|05)+([0-9]{8})\\b)')])),
        image: new FormControl(next.image, Validators.compose([Validators.required])),
        positionDto: new FormGroup({
          id: new FormControl(next.positionDto.id),
          positionName: new FormControl(next.positionDto.positionName, Validators.compose([Validators.required]))
        }),
        accountDto: new FormGroup({
          id : new FormControl(next.accountDto.id),
          // tslint:disable-next-line:max-line-length
          userName: new FormControl(next.accountDto.userName, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(15)])),
          // tslint:disable-next-line:max-line-length
          encryptPassword: new FormControl(next.accountDto.encryptPassword, Validators.compose([Validators.required , Validators.minLength(6), Validators.maxLength(15)])),
          email: new FormControl(next.accountDto.email, Validators.compose([Validators.required, Validators.pattern('^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,}){1,}$')])),
        }),

      });
      this.imgVip = next.image;
      console.log(next.positionDto.positionName);

    }, error => {
      alert('bạn đang chọn một đường dẫn không tồn tại nếu còn cố chấp thì đừng trách tối ác ');
      this.router.navigate(['/employee/list']);
    });
  }



  updateEmployee(id: number) {
    if (this.selectedImage != null) {
      const nameImg = '/EmP-' + this.editEmployeeForm.get('idCard') + '.jpg';
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.editEmployeeForm.patchValue({image: url});
            const employee = this.editEmployeeForm.value;
            this.employeeService.updateEmployee(id, employee).subscribe(() => {
              this.router.navigate(['/employee/list']);
            }, error => {
              this.errorIdCard = error.error.errorMap.idCard;
              this.errorEmailEmployee = error.error.errorMap.email;
              this.errorUserNameEmployee = error.error.errorMap.userName;
            });
          });
        })
      ).subscribe();
    }else{
      const employee = this.editEmployeeForm.value;
      this.employeeService.updateEmployee(id, employee).subscribe(() => {
        this.router.navigate(['/employee/list']);
      }, error => {
        this.errorIdCard = error.error.errorMap.idCard;
        console.log(error.error.errorMap.email);
        this.errorEmailEmployee = error.error.errorMap.email;
        this.errorUserNameEmployee = error.error.errorMap.userName;
      });
    }}


  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = e => {
      console.log(e);
      this.imgVip = reader.result as string;
    };
  }
  get employeeName() {
    return this.editEmployeeForm.get('employeeName');
  }

  get email() {
    return this.editEmployeeForm.get('accountDto').get('email');
  }

  get encryptPassword() {
    return this.editEmployeeForm.get('accountDto').get('encryptPassword');
  }

  get userName() {
    return this.editEmployeeForm.get('accountDto').get('userName');
  }

  get positionDto() {
    return this.editEmployeeForm.get('positionDto');
  }

  get image() {
    return this.editEmployeeForm.get('image');
  }

  get phoneNumber() {
    return this.editEmployeeForm.get('phoneNumber');
  }

  get idCard() {
    return this.editEmployeeForm.get('idCard');
  }

  get address() {
    return this.editEmployeeForm.get('address');
  }

  get dateOfBirth() {
    return this.editEmployeeForm.get('dateOfBirth');
  }
}
