import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from 'chart.js';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {SaleReportService} from "../../../services/report/sale-report.service";

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

  chart1 = Chart.getChart('');
  chart2 = Chart.getChart('');
  notFound = '';
  alertClass = '';



  notValid = '';
  alertNotValid = '';


  formSearch = new FormGroup({
    startDay: new FormControl('', [Validators.required, Validators.pattern("^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$")]),
    endDay: new FormControl('', [Validators.required, Validators.pattern("^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$")]),
    typeReport: new FormControl('ALL', Validators.required),
    productId: new FormControl('', Validators.required)
  });

  totalSales = 0;
  totalInvoices = 0;

  constructor(private saleReportService: SaleReportService) {
  }

  ngOnInit(): void {
    this.changeTypeReport();
  }

  sumArr(arr) {
    let total = 0;
    for (const a of arr) {
      total += +a;
    }
    return total;
  }


  showSaleReport() {
    if (this.getStartDay().value == '') {
      this.getStartDay().setErrors({empty: true})
    }

    if (this.getEndDay().value == '') {
      this.getEndDay().setErrors({empty: true})
    }

    if (this.getTypeReport().value == 'ID' && this.getProductId().value == '') {
      this.getProductId().setErrors({empty: true});
    }

    this.chart1?.destroy();
    this.chart2?.destroy();

    if (this.formSearch.valid) {
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
              data: invoices,
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
      this.alertNotValid = 'alert alert-danger';

    }

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

    const type = this.formSearch.get('typeReport').value;



    // tslint:disable-next-line:triple-equals
    if (type != 'ID') {
      this.formSearch.get('productId').setValue('');
      this.formSearch.get('productId').disable();
    } else {
      this.formSearch.get('productId').enable();
    }
  }

  getProductFromQRCode(product: any) {
    this.product = product;
    console.log(this.product);
  }

  checkDay() {
    let date1 = new Date(this.formSearch.get('startDay')?.value);
    let date2 = new Date(this.formSearch.get('endDay')?.value);
    if (date1?.getTime() > date2?.getTime()) {
      this.formSearch.get('endDay').setErrors({errDate: true});
    }
  }

}
