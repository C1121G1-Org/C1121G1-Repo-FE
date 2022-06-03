import {Component, OnInit} from '@angular/core';
import {QrcodeService} from "../../../services/qrcode/qrcode.service";
import {Product} from "../../../models/product";
import {ProductService} from "../../../services/product/product.service";
import {SaleReport} from "../model/sale-report";
import {SaleReportService} from "../../../services/report/sale-report.service";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  message = "";
  typeQRScan = "1";

  image1 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";
  image2 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";

  constructor(private saleReportSerive: SaleReportService, private qrCodeService: QrcodeService, private productService: ProductService) {
  }

  ngOnInit(): void {
    let saleReport: SaleReport[] = [];
    this.saleReportSerive.getAllSaleREports().subscribe(data => {
      saleReport = data;
      console.log(saleReport);
    })
  }

  scanQRCode() {
    let file: any = document.querySelectorAll("input[type='file']");
    if (this.typeQRScan == '1') {
      if (file[0].files[0]) {
        let formData = new FormData();
        formData.append('file', file[0].files[0]);
        this.qrCodeService.decode(formData).subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err)
        })
        this.message = "";
      } else {
        this.message = "Vui lòng chọn ảnh !";
        this.image1 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";
      }

    } else {
      if (file[0].files[0] && file[1].files[0]) {
        let formData = new FormData();
        formData.append('file1', file[0].files[0]);
        formData.append('file2', file[1].files[0]);
        this.qrCodeService.check(formData).subscribe(data => {
          console.log(data);
        }, err => {
          console.log(err);
        })
        this.message = "";
      } else {
        this.message = "Vui lòng chọn ảnh !";
      }
    }
  }

  readFile1(target: any) {
    let file: File = target.files[0];
    if (file) {
      let reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = e => {
        this.image1 = reader?.result as string;
      }
      this.message = "";
    } else {
      this.message = "Vui lòng chọn ảnh !";
      this.image1 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";
    }

  }

  readFile2(target: any) {
    let file: File = target.files[0];
    if (file) {
      let reader = new FileReader();
      reader?.readAsDataURL(file);
      reader.onload = e => {
        this.image2 = reader?.result as string;
      }
      this.message = "";
    } else {
      this.message = "Vui lòng chọn ảnh !";
      this.image2 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";
    }

  }


}
