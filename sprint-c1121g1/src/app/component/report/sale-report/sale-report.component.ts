<<<<<<< HEAD
import {Component, OnInit} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from "chart.js";
import {QrcodeService} from "../../../services/qrcode/qrcode.service";
import {FormControl, FormGroup} from "@angular/forms";
=======

import {Component, OnInit} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from 'chart.js';

>>>>>>> 5fdc4b95f466acb78b3d26a1da7dc5b164398035

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
Chart.register(...registerables);





@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {
<<<<<<< HEAD

  formSearch = new FormGroup({
    startDay: new FormControl(),
    endDay: new FormControl(),
    typeReport: new FormControl(),
    productId: new FormControl()
  })

  message = "";
  typeQRScan = "1";

  image1 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";
  image2 = "https://uniquartz.co.nz/wp-content/uploads/2018/06/image_large.png";

  xValues = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  sales = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  invoices = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];
  totalSales = 0;
  totalInvoices = 0;


  constructor(private qrCodeService: QrcodeService) {

  }

  ngOnInit(): void {

    this.totalSales = this.sumArr(this.sales);
    this.totalInvoices = this.sumArr(this.invoices);

    new Chart("doanhThu", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          label: "Doanh Thu Theo Tháng (USD)",
          pointRadius: 3,
          pointBackgroundColor: "red",
          borderColor: "red",
          backgroundColor: "red",
          data: this.sales,
=======
  months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  doanhThus = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  donHangs = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];
  sale = 0;
  invoice = 0;
  constructor() { }

  ngOnInit(): void {
    this.sale = this.sumArr(this.doanhThus);
    this.invoice = this.sumArr(this.donHangs);
    new Chart('doanhThu', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Doanh Thu Theo Tháng (USD)',
          pointRadius: 3,
          pointBackgroundColor: 'red',
          borderColor: 'red',
          backgroundColor: 'red',
          data: this.doanhThus,
>>>>>>> 5fdc4b95f466acb78b3d26a1da7dc5b164398035
          fill: false,
          tension: 0.1
        }]
      },
      options: {}
    });
<<<<<<< HEAD

    new Chart("donHang", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          label: "Đơn hàng Theo Tháng",
          fill: false,
          data: this.invoices,
          pointRadius: 3,
          pointBackgroundColor: "blue",
          backgroundColor: "blue",
          borderColor: "blue",
=======
    new Chart('donHang', {
      type: 'line',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Đơn hàng Theo Tháng',
          fill: false,
          data: this.donHangs,
          pointRadius: 3,
          pointBackgroundColor: 'blue',
          backgroundColor: 'blue',
          borderColor: 'blue',
>>>>>>> 5fdc4b95f466acb78b3d26a1da7dc5b164398035
          tension: 0.1
        }]
      },
      options: {}
    });
<<<<<<< HEAD

    this.changeTypeReport();

  }

=======
  }


>>>>>>> 5fdc4b95f466acb78b3d26a1da7dc5b164398035
  sumArr(arr) {
    let total = 0;
    for (const a of arr) {
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

  showSaleReport() {
    console.log(this.formSearch.value);
    this.totalSales = this.sumArr(this.sales);
    this.totalInvoices = this.sumArr(this.invoices);
    new Chart("doanhThu", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          label: "Doanh Thu Theo Tháng (USD)",
          pointRadius: 3,
          pointBackgroundColor: "red",
          borderColor: "red",
          backgroundColor: "red",
          data: this.sales,
          fill: false,
          tension: 0.1
        }]
      },
      options: {}
    });
    new Chart("donHang", {
      type: "line",
      data: {
        labels: this.xValues,
        datasets: [{
          label: "Đơn hàng Theo Tháng",
          fill: false,
          data: this.invoices,
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

  getStartDay() {
    return this.formSearch.get('startDay');
  }

  getEndDay() {
    return this.formSearch.get('endDay');
  }

  getTypeReport() {
    return this.formSearch.get('typeReport');
  }

  getProductId() {
    return this.formSearch.get('productId');
  }

  changeTypeReport() {
    let type = this.formSearch.get('typeReport').value;
    if (type != 'ID') {
      this.formSearch.get('productId').disable();
    } else {
      this.formSearch.get('productId').enable();
    }
  }
=======
>>>>>>> 5fdc4b95f466acb78b3d26a1da7dc5b164398035
}
