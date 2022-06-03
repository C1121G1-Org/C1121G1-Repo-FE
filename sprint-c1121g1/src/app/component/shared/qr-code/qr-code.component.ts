import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {SaleReportService} from '../../../services/report/sale-report.service';
import {QrcodeService} from '../../../services/qrcode/qrcode.service';
import {ProductService} from '../../../services/product/product.service';
import {Product} from '../../../models/product';

/*
    Created by HauPV
    Time: 09:00 03/06/2022
    Function: qr-code scan
*/

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})

export class QrCodeComponent implements OnInit {

  @Output()
  sendProduct = new EventEmitter();

  product: Product = {};

  message = '';
  alertClass = '';
  typeQRScan = '1';

  image1 = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';
  image2 = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';


  constructor(private saleReportSerive: SaleReportService, private qrCodeService: QrcodeService, private productService: ProductService) {
  }

  ngOnInit(): void {
  }

  scanQRCode() {

    const file: any = document.querySelectorAll('input[type=\'file\']');

    if (this.typeQRScan == '1') {
      if (file[0].files[0]) {
        const formData = new FormData();
        formData.append('file', file[0].files[0]);
        this.qrCodeService.decode(formData).subscribe(data => {
          this.product = data;
          this.sendProduct.emit(this.product);
        }, err => {
          console.log(err);
        });
        this.message = '';
        this.alertClass = '';
      } else {
        this.alertClass = 'alert alert-danger';
        this.message = 'Vui lòng chọn ảnh !';
        this.image1 = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';
      }

    } else {
      if (file[0].files[0] && file[1].files[0]) {
        this.alertClass = '';
        this.message = '';
        const formData = new FormData();
        formData.append('file1', file[0].files[0]);
        formData.append('file2', file[1].files[0]);
        this.qrCodeService.check(formData).subscribe(data => {
          if (data) {
            this.alertClass = 'alert alert-success';
            this.message = 'Mã QR HỢP LỆ !';
          } else {
            this.alertClass = 'alert alert-danger';
            this.message = 'Mã QR KHÔNG HỢP LỆ !';
          }

        }, err => {
          this.alertClass = 'alert alert-danger';
          this.message = 'Mã QR KHÔNG HỢP LỆ !';
        });
        this.alertClass = '';
        this.message = '';
      } else {
        this.alertClass = 'alert alert-danger';
        this.message = 'Vui lòng chọn ảnh !';
      }
    }
  }

  readFile1(target: any) {
    const file: File = target.files[0];
    if (file) {
      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = e => {
        this.image1 = reader?.result as string;
      };
      this.message = '';
    } else {
      this.alertClass = 'alert alert-danger';
      this.message = 'Vui lòng chọn ảnh !';
      this.image1 = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';
    }

  }

  readFile2(target: any) {
    const file: File = target.files[0];
    if (file) {
      const reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = e => {
        this.image2 = reader?.result as string;
      };
      this.message = '';
      this.alertClass = '';
    } else {
      this.alertClass = 'alert alert-danger';
      this.message = 'Vui lòng chọn ảnh !';
      this.image2 = 'https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png';
    }

  }

}
