import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from "chart.js";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../../models/product";

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
Chart.register(...registerables)

/*
    Created by HauPV
    Time: 09:00 03/06/2022
    Function: get sale report list and display view
*/

@Component({
  selector: 'app-sale-report',
  templateUrl: './sale-report.component.html',
  styleUrls: ['./sale-report.component.css']
})
export class SaleReportComponent implements OnInit {
  product: Product = {};

  formSearch = new FormGroup({
    startDay: new FormControl('', Validators.required),
    endDay: new FormControl('', Validators.required),
    typeReport: new FormControl('ALL', Validators.required),
    productId: new FormControl('', Validators.required)
  })

  xValues = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"];
  sales = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  invoices = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];
  totalSales = 0;
  totalInvoices = 0;


  constructor() {

  }

  ngOnInit(): void {
    this.changeTypeReport()
  }

  sumArr(arr) {
    let total = 0;
    for (let a of arr) {
      total += a;
    }
    return total;
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

  getProductFromQRCode(product: any) {
    this.product = product;
    console.log(this.product);
  }
}
