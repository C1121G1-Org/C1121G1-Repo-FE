import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ProductService} from '../../../services/product/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  productForm: FormGroup;
  selectedImage: any = null;
  flag = false;
  urlTest = '';
  id: number;
  img2: string;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = Number(paramMap.get('id'));

      this.productService.findById(this.id).subscribe(product => {
        this.img2 = product.image;
        console.log(this.img2);
        this.productForm = new FormGroup({
          id: new FormControl(product.id),
          name: new FormControl(product.name),
          price: new FormControl(product.price),
          image: new FormControl(''),
          screenSize: new FormControl(product.screenSize),
          camera: new FormControl(product.camera),
          selfie: new FormControl(product.selfie),
          cpu: new FormControl(product.cpu),
          memory: new FormControl(product.memory),
          otherDescription: new FormControl(product.otherDescription),
        });
      });
    })
  }

  ngOnInit(): void {
  }

  submit() {

  }

  save() {
    const nameImg = this.getCurrentDateTime() + this.selectedImage.name;
    const fileRef = this.storage.ref(nameImg);
    this.storage.upload(nameImg, this.selectedImage).snapshotChanges().pipe(
      finalize(() => {

        fileRef.getDownloadURL().subscribe((url) => {
          this.urlTest = url;
          this.productForm.patchValue({image: url});
          console.log(this.productForm.controls.image);
          // Call API to create vaccine
          this.productService.updateProduct(this.id, this.productForm.value).subscribe(() => {
            this.productForm.reset();

            // this.router.navigateByUrl('vaccine-list').then(r => this.alertService.showMessage("Thêm mới thành công!"));
            console.log('success');
          });
        });
      })
    ).subscribe();
  }

  showPreview(event: any) {
    this.selectedImage = event;

  }


  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }
}
