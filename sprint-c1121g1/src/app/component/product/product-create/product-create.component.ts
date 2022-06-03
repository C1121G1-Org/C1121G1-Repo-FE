import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  productForm: FormGroup;
  selectedImage: any = null;
  flag = false;
  img2 = 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg';

  constructor(private productService: ProductService,
              private router: Router,
              // private alertService: AlertService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
    this.productForm = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      price: new FormControl('', [Validators.required, Validators.pattern('^(([0]*[1-9][0-9]*)|[1-9][0-9]*)$')]),
      image: new FormControl(''),
      screenSize: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      camera: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      selfie: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      cpu: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      memory: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      otherDescription: new FormControl(''),
    });

  }

  ngOnInit(): void {
  }

  /*
      Created by TuanPA
      Date: 9:08 3/6/2022
      Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
  */
  showPreview(event: any) {
    this.selectedImage = event.target.files[0];
    console.log(this.selectedImage);
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {

        fileRef.getDownloadURL().subscribe((url) => {
          this.img2 = url;
          console.log(this.img2);
          // this.productForm.patchValue({image: url});
          // console.log(this.productForm.controls.image);
          // Call API to create vaccine

        });
      })
    ).subscribe();
  }

  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
*/
  // save() {
  //   console.log(this.productForm.value);
  //   // const nameImg = this.getCurrentDateTime();
  //   console.log('submited');
  //   const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
  //   const fileRef = this.storage.ref(nameImg);
  //   this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
  //     finalize(() => {
  //
  //       fileRef.getDownloadURL().subscribe((url) => {
  //         this.img2 = url;
  //         this.productForm.patchValue({image: url});
  //         // console.log(this.productForm.controls.image);
  //         // Call API to create vaccine
  //         this.productService.createProduct(this.productForm.value).subscribe(() => {
  //           this.productForm.reset();
  //           alert('Created successfully');
  //           // this.router.navigateByUrl('/api/product');
  //           // this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
  //           console.log('success');
  //         });
  //       });
  //     })
  //   ).subscribe();
  // }

  /*
    Created by TuanPA
    Date: 9:08 3/6/2022
    Function: This JwtFilter class extends OncePerRequestFilter class to override method doFilterInternal()
*/
  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }


  save() {
    if (this.productForm.invalid) {
      console.log(this.productForm.value);
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
    } else {
      console.log(this.productForm.value);
      // const nameImg = this.getCurrentDateTime();
      console.log('submited');
      const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
      const fileRef = this.storage.ref(nameImg);
      this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {

          fileRef.getDownloadURL().subscribe((url) => {
            this.img2 = url;
            this.productForm.patchValue({image: url});
            // console.log(this.productForm.controls.image);
            // Call API to create vaccine
            this.productService.createProduct(this.productForm.value).subscribe(() => {
              this.productForm.reset();
              alert('Created successfully');
              // this.router.navigateByUrl('/api/product');
              // this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
              console.log('success');
            });
          });
        })
      ).subscribe();
    }
  }


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
