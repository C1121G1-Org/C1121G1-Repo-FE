import {Component, OnInit} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
Chart.register(...registerables)


@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {

  typeQRScan = "1";

  imageSRC = "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-file-upload-icon-image_1344464.jpg";

  image1 = "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-file-upload-icon-image_1344464.jpg";
  image2 = "https://png.pngtree.com/element_our/20190601/ourlarge/pngtree-file-upload-icon-image_1344464.jpg";

  months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  doanhThus = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  donHangs = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];

  sale = 0;
  invoice = 0;

  constructor() {

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

  sumArr(arr) {
    let total = 0;
    for (let a of arr) {
      total += a;
    }
    return total;
  }

  readFile(target: any) {
    let file: File = target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = e => {
      this.imageSRC = reader.result as string;
    }
  }


  scanQRCode() {
    let file: any = document.querySelectorAll("input[type='file']");
    for (let a of file) {
      console.log(a.files[0]);
    }
  }
}
