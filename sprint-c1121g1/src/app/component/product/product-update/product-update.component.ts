import {Component, Inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {Category} from '../../../models/category';
import {CategoryService} from '../../../services/category/category.service';
@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  imgVip = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';
  productForm = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    image: new FormControl(),
    screenSize: new FormControl(),
    camera: new FormControl(),
    selfie: new FormControl(),
    cpu: new FormControl(),
    memory: new FormControl(),
    otherDescription: new FormControl(),
    categoryDto: new FormControl()
  });
  selectedImage: any = null;
  flag = false;
  errorProductName: string;
  id: number;
  categoryList: Category[] = [];
  // tslint:disable-next-line:variable-name
  product_price = '';
  constructor(private productService: ProductService,
              private categoryService: CategoryService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));
      this.productService.findById(this.id).subscribe(product => {
        // console.log(product);
        this.imgVip = product.image;
        this.product_price = product.price;
        this.productForm = new FormGroup({
          id: new FormControl(product.id),
          name: new FormControl(product.name, [Validators.required, Validators.maxLength(255)]),
          price: new FormControl(product.price, [Validators.required, Validators.pattern('^(([0]*[1-9][0-9]*)|[1-9][0-9]*)$')]),
          image: new FormControl(product.image),
          screenSize: new FormControl(product.screenSize, [Validators.required, Validators.maxLength(50)]),
          camera: new FormControl(product.camera, [Validators.required, Validators.maxLength(50)]),
          selfie: new FormControl(product.selfie, [Validators.required, Validators.maxLength(50)]),
          cpu: new FormControl(product.cpu, [Validators.required, Validators.maxLength(50)]),
          memory: new FormControl(product.memory, [Validators.required, Validators.maxLength(50)]),
          otherDescription: new FormControl(product.otherDescription),
          // category: new FormControl(product.category, Validators.compose([Validators.required])),
          categoryDto: new FormControl(product.category)
        });
      }, error => {
        console.log(error.error);
        this.router.navigateByUrl('/error');
      });
    });
  }
  ngOnInit(): void {
    this.categoryService.getAll().subscribe(data => {
      this.categoryList = data;
    });
  }
  CommaFormatted(event) {
    // skip for arrow keys
    if (event.any >= 37 && event.any <= 40) {
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
  checkValidatePrice(input: any) {
    if (input.target.value != '') {
      this.productForm.controls.price.setErrors({empty: null});
      this.productForm.controls.categoryDto.updateValueAndValidity();
    } else {
      this.productForm.controls.price.setErrors({empty: 'Empty! Please input!'});
    }
  }
  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
  */
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImage);
    reader.onload = e => {
      console.log(e);
      this.imgVip = reader.result as string;
    };
  }
  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
*/
  comparefn(t1: Category, t2: Category): boolean {
    return t1 && t2 ? t1.id === t2.id : t1 === t2;
  }
  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
  */
  save(errorModalBtn: HTMLButtonElement, successBtn: HTMLButtonElement) {
    let money = '';
    let check = false;
    for (let i = 0; i < this.product_price.length; i++) {
      if (this.product_price.charAt(i) === ',') {
        let arr = this.product_price?.split(',');
        for (let a of arr) {
          money += a;
        }
        money = money.trim();
        this.productForm.controls.price.setValue(money);
        check = true;
        break;
      }
    }
    if (!check) {
      this.productForm.controls.price.setValue(this.product_price);
    }
    if (this.productForm.invalid) {
      console.log(this.productForm.value);
      console.log('haha');
      if (this.productForm.get('name').value == '') {
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
      if (this.selectedImage != null) {
        const nameImg = '/PD-' + this.productForm.get('name').value + '.jpg';
        console.log(nameImg);
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.productForm.patchValue({image: url});
              this.productService.updateProduct(this.id, this.productForm.value).subscribe(() => {
                  // alert('edited successfully');
                  successBtn.click();
                  this.router.navigateByUrl('/api/product/listProduct');
                  console.log('success');
                }, error => {
                  console.log(error.error.errorMap.name);
                  this.errorProductName = error.error.errorMap.name;
                  errorModalBtn.click();
                }
              );
            });
          })
        ).subscribe();
      } else {
        this.productService.updateProduct(this.id, this.productForm.value).subscribe(() => {
          // alert('edited successfully');
          successBtn.click();
          this.router.navigateByUrl('/api/product/listProduct');
          // this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
          console.log('success');
        }, error => {
          console.log(error.error.errorMap.name);
          this.errorProductName = error.error.errorMap.name;
          errorModalBtn.click();
        });
      }
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
}
