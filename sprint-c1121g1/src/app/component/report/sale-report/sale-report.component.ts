<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from "chart.js";
import {QrcodeService} from "../../../services/qrcode/qrcode.service";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
Chart.register(...registerables)


=======
import { Component, OnInit } from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from "chart.js";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
Chart.register(...registerables)
>>>>>>> 63d53c65a414e05e8cb9a227b1f3742e9ef9b616
@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {
<<<<<<< HEAD

  message = "";
  typeQRScan = "1";

  image1 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";
  image2 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";

  months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  doanhThus = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  donHangs = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];

  sale = 0;
  invoice = 0;

  constructor(private qrCodeService: QrcodeService) {

  }

  ngOnInit(): void {
    this.sale = this.sumArr(this.doanhThus);
    this.invoice = this.sumArr(this.donHangs);

    new Chart("doanhThu", {
      type: "line",
      data: {
        labels: this.months,
        datasets: [{
          label: "Doanh Thu Theo Tháng (USD)",
          pointRadius: 3,
          pointBackgroundColor: "red",
          borderColor: "red",
          backgroundColor: "red",
          data: this.doanhThus,
          fill: false,
          tension: 0.1
        }]
      },
      options: {}
    });

    new Chart("donHang", {
      type: "line",
      data: {
        labels: this.months,
        datasets: [{
          label: "Đơn hàng Theo Tháng",
          fill: false,
          data: this.donHangs,
          pointRadius: 3,
          pointBackgroundColor: "blue",
          backgroundColor: "blue",
          borderColor: "blue",
          tension: 0.1
        }]
      },
      options: {}
    });
  }

=======
  months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  doanhThus = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  donHangs = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];
  sale = 0;
  invoice = 0;
  constructor() { }

  ngOnInit(): void {
    this.sale = this.sumArr(this.doanhThus);
    this.invoice = this.sumArr(this.donHangs);
    new Chart("doanhThu", {
      type: "line",
      data: {
        labels: this.months,
        datasets: [{
          label: "Doanh Thu Theo Tháng (USD)",
          pointRadius: 3,
          pointBackgroundColor: "red",
          borderColor: "red",
          backgroundColor: "red",
          data: this.doanhThus,
          fill: false,
          tension: 0.1
        }]
      },
      options: {}
    });
    new Chart("donHang", {
      type: "line",
      data: {
        labels: this.months,
        datasets: [{
          label: "Đơn hàng Theo Tháng",
          fill: false,
          data: this.donHangs,
          pointRadius: 3,
          pointBackgroundColor: "blue",
          backgroundColor: "blue",
          borderColor: "blue",
          tension: 0.1
        }]
      },
      options: {}
    });
  }

>>>>>>> 63d53c65a414e05e8cb9a227b1f3742e9ef9b616
  sumArr(arr) {
    let total = 0;
    for (let a of arr) {
      total += a;
    }
    return total;
  }


<<<<<<< HEAD
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
=======
>>>>>>> 63d53c65a414e05e8cb9a227b1f3742e9ef9b616
}
