import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
// @ts-ignore
import {formatDate} from '@angular/common';
import {CategoryService} from '../../../services/category/category.service';
import {Category} from '../../../models/category';
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  imgVip = 'https://icon-library.com/images/photograph-icon/photograph-icon-17.jpg';
  productForm: FormGroup;
  selectedImage: any = null;
  flagCheckImage: boolean;
  alertImage = '';
  flag = false;
  productName: string;
  errorProductName: string;
  categoryList: Category[] = [];
  // tslint:disable-next-line:variable-name
  product_price = '';
  // price: any;
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private router: Router,
              // private alertService: AlertService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      price: new FormControl(''),
      image: new FormControl(''),
      screenSize: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      camera: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      selfie: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      cpu: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      memory: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      otherDescription: new FormControl(''),
      categoryDto: new FormControl('', Validators.compose([Validators.required])),
    });
  }
  comparefn(t1: Category, t2: Category): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
  ngOnInit(): void {
    // this.productForm.valueChanges.subscribe(form => {
    //   if (form.price) {
    //     this.productForm.patchValue({
    //       price: this.currencyPipe.transform(form.price.replace(/\D/g, '').replace(/^0+/, ''), 'USD', 'symbol', '1.0-0')
    //     }, {emitEvent: false});
    //   }
    // });
    console.log(this.validateImange(this.imgVip));
    this.productForm.controls.categoryDto.setValue('');
    this.categoryService.getAll().subscribe(data => {
      this.categoryList = data;
    });
  }
  // onImageChangeFromFile($event: any) {
  //   if ($event.target.files && $event.target.files[0]) {
  //     const file = $event.target.files[0];
  //     console.log(file);
  //     console.log(file.type);
  //     if (file.type == 'image/jpeg') {
  //       console.log('correct');
  //
  //     } else {
  //       this.productForm.reset();
  //       this.productForm.controls.imageInput.setValidators([Validators.required]);
  //       this.productForm.get('imageInput').updateValueAndValidity();
  //     }
  //   }
  // }
  validateImange(e): boolean {
    return e == 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
  }
  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
  */
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    console.log('aaaaa');
    const ext = this.selectedImage.name.substring(this.selectedImage.name.length - 3);
    console.log(ext);
    if (this.selectedImage.name != 'jpg') {
    }
    if (this.selectedImage) {
      this.alertImage = '';
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = e => {
      this.imgVip = reader.result as string;
    };
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
*/
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
  CommaFormatted(event) {
    // skip for arrow keys
    if (event.which >= 37 && event.which <= 40) {
      return;
    }
    // format number
    if (this.product_price) {
      this.product_price = this.product_price.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
  }
  numberCheck(args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
  */
  save(errorModalBtn: HTMLButtonElement, successButton: HTMLButtonElement) {
    let arr = this.product_price.split(',');
    let money = '';
    for (let a of arr) {
      money += a;
    }
    money = money.trim();
    this.productForm.controls.price.setValue(money);
    // if (this.validateImange(this.imgVip)){
    //   this.flagCheckImage = true;
    //   this.productForm.controls.image.setErrors({existed: 'Empty! Please input!'});
    // }
    if (this.productForm.invalid || !this.selectedImage) {
      if (!this.selectedImage) {
        this.alertImage = 'Vui lòng nhập ảnh';
      }
      if (this.productForm.controls.name.value == '') {
        this.productForm.controls.name.setErrors({empty: 'Empty! Please input!'});
      }
      if (this.productForm.controls.price.value == '') {
        this.productForm.controls.price.setErrors({empty: 'Empty! Please input!'});
      }
      // if (this.productForm.controls.image.value == null) {
      //   this.productForm.controls.image.setErrors({empty: 'Empty! Please input!'});
      // }
      if (this.productForm.controls.screenSize.value == '') {
        this.productForm.controls.screenSize.setErrors({empty: 'Empty! Please input!'});
      }
      if (this.productForm.controls.camera.value == '') {
        this.productForm.controls.camera.setErrors({empty: 'Empty! Please input!'});
      }
      if (this.productForm.controls.selfie.value == '') {
        this.productForm.controls.selfie.setErrors({empty: 'Empty! Please input!'});
      }
      if (this.productForm.controls.cpu.value == '') {
        this.productForm.controls.cpu.setErrors({empty: 'Empty! Please input!'});
      }
      if (this.productForm.controls.memory.value == '') {
        this.productForm.controls.memory.setErrors({empty: 'Empty! Please input!'});
      }
      if (this.productForm.controls.categoryDto.value == '') {
        this.productForm.controls.categoryDto.setErrors({empty: 'Empty! Please input!'});
      }
    } else {
      this.alertImage = '';
      const nameImg = '/PD-' + this.productName + '.jpg';
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.productForm.patchValue({image: url});
            this.flagCheckImage = false;
            this.productService.createProduct(this.productForm.value).subscribe(() => {
                this.productForm.reset();
                successButton.click();
                // this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
                console.log('success');
              }, error => {
                console.log(this.productForm.value);
                // tslint:disable-next-line:no-conditional-assignment
                if (this.errorProductName = error.error.errorMap.name) {
                  console.log(this.errorProductName);
                  errorModalBtn.click();
                }
              }
            );
          });
        })
      ).subscribe();
    }
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
*/
  get name() {
    return this.productForm.get('name');
  }
  get price() {
    return this.productForm.get('price');
  }
  get image() {
    return this.productForm.get('image');
  }
  get screenSize() {
    return this.productForm.get('screenSize');
  }
  get camera() {
    return this.productForm.get('camera');
  }
  get selfie() {
    return this.productForm.get('selfie');
  }
  get cpu() {
    return this.productForm.get('cpu');
  }
  get memory() {
    return this.productForm.get('memory');
  }
  get otherDescription() {
    return this.productForm.get('otherDescription');
  }
  validateCategory(target: any) {
    if (this.productForm.controls.categoryDto.value != '') {
      this.productForm.controls.categoryDto.setErrors({empty: null});
      this.productForm.controls.categoryDto.updateValueAndValidity();
    } else {
      this.productForm.controls.categoryDto.setErrors({empty: 'Empty! Please input!'});
    }
  }
  checkValidatePrice(input: any) {
    if (input.target.value != '') {
      this.productForm.controls.price.setErrors({empty: null});
      this.productForm.controls.categoryDto.updateValueAndValidity();
    } else {
      this.productForm.controls.price.setErrors({empty: 'Empty! Please input!'});
    }
  }
}
