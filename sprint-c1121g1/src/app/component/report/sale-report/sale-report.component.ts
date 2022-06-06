import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from 'chart.js';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
Chart.register(...registerables);

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
<<<<<<< HEAD
=======
  chart1 = Chart.getChart('');
  chart2 = Chart.getChart('');
  notFound = '';
  alertClass = '';

  notValid = '';
  alertNotValid = '';
>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8

  formSearch = new FormGroup({
    startDay: new FormControl('', Validators.required),
    endDay: new FormControl('', Validators.required),
    typeReport: new FormControl('ALL', Validators.required),
    productId: new FormControl('', Validators.required)
  });

  xValues = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  sales = [100, 200, 500, 900, 300, 800, 400, 1000, 1200, 1100, 600, 800];
  invoices = [10, 2, 4, 5, 8, 9, 3, 1, 6, 7, 12, 11];
  totalSales = 0;
  totalInvoices = 0;


  constructor() {

  }

  ngOnInit(): void {
    this.changeTypeReport();
  }

  sumArr(arr) {
    let total = 0;
    for (const a of arr) {
      total += a;
    }
    return total;
  }


  showSaleReport() {
<<<<<<< HEAD
    console.log(this.formSearch.value);
    this.totalSales = this.sumArr(this.sales);
    this.totalInvoices = this.sumArr(this.invoices);
    // tslint:disable-next-line:no-unused-expression
    new Chart('doanhThu', {
      type: 'line',
      data: {
        labels: this.xValues,
        datasets: [{
          label: 'Doanh Thu Theo Tháng (USD)',
          pointRadius: 3,
          pointBackgroundColor: 'red',
          borderColor: 'red',
          backgroundColor: 'red',
          data: this.sales,
          fill: false,
          tension: 0.1
        }]
      },
      options: {}
    });
    // tslint:disable-next-line:no-unused-expression
    new Chart('donHang', {
      type: 'line',
      data: {
        labels: this.xValues,
        datasets: [{
          label: 'Đơn hàng Theo Tháng',
          fill: false,
          data: this.invoices,
          pointRadius: 3,
          pointBackgroundColor: 'blue',
          backgroundColor: 'blue',
          borderColor: 'blue',
          tension: 0.1
        }]
      },
      options: {}
    });
=======
    this.chart1?.destroy();
    this.chart2?.destroy();

    if (this.formSearch.valid) {
      this.notValid = '';
      this.alertNotValid = '';
      let xValues = [];
      let sales = [];
      let invoices = [];
      let startDay = this.formSearch.get('startDay').value;
      let endDay = this.formSearch.get('endDay').value;
      let productId = this.formSearch.get('productId').value;
      this.saleReportService.getAllSaleREports(startDay, endDay, productId).subscribe(data => {
        this.notFound = "";
        this.alertClass = "";

        for (let dt of data) {
          xValues.push(dt.date);
          invoices.push(dt.invoiceQuantity);
          sales.push(dt.totalMoney);
          this.totalSales = this.sumArr(sales);
          this.totalInvoices = this.sumArr(invoices);
        }

        this.chart1 = new Chart('doanhThu', {
          type: 'line',
          data: {
            labels: xValues,
            datasets: [{
              label: 'Doanh Thu (VNĐ)',
              pointRadius: 3,
              pointBackgroundColor: 'red',
              borderColor: 'red',
              backgroundColor: 'red',
              data: sales,
              fill: false,
              tension: 0.1
            }]
          },
          options: {}
        });

        this.chart2 = new Chart('donHang', {
          type: 'line',
          data: {
            labels: xValues,
            datasets: [{
              label: 'Đơn hàng ( Đơn )',
              fill: false,
              data: invoices.map(f => {return f.toFixed()}),
              pointRadius: 3,
              pointBackgroundColor: 'blue',
              backgroundColor: 'blue',
              borderColor: 'blue',
              tension: 0.1
            }]
          },
          options: {}
        });
      }, error => {
        this.alertClass = "text-center alert alert-danger";
        this.notFound = "KHÔNG TÌM THẤY DỮ LIỆU THÍCH HỢP !";
        this.totalInvoices = 0 ;
        this.totalSales = 0 ;
      });

    } else {
      this.notValid = 'VUI LÒNG ĐIỀN ĐÚNG THÔNG TIN YÊU CẦU !';
      this.alertNotValid = 'alert alert-warning';
    }

>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8
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
    // let type = this.formSearch.get('typeReport').value;
    const type = this.formSearch.get('typeReport').value;
<<<<<<< HEAD
=======


>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8
    // tslint:disable-next-line:triple-equals
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
<<<<<<< HEAD
=======

  checkDay() {
    let date1 = new Date(this.formSearch.get('startDay')?.value);
    let date2 = new Date(this.formSearch.get('endDay')?.value);
    if (date1?.getTime() > date2?.getTime()) {
      this.formSearch.get('endDay').setErrors({errDate: true});
    }
  }

  closeNotValidAlert() {
    this.notValid = '';
    this.alertNotValid = '';
  }
>>>>>>> e4837ffe24d5547f69d85a6bc4e0fac7f0ba52d8
}
