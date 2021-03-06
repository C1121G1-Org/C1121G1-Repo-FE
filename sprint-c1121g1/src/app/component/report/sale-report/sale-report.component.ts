import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart, LineController, LineElement, PointElement, registerables, LinearScale, Title} from 'chart.js';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../models/product';
import {SaleReportService} from '../../../services/report/sale-report.service';


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
  products: Product[] = [];

  chart1 = Chart.getChart('');
  chart2 = Chart.getChart('');
  notFound = '';
  alertClass = '';

  formSearch = new FormGroup({
    startDay: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
    endDay: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
    typeReport: new FormControl('', Validators.required),
    productId: new FormControl('', Validators.required)
  });

  totalSales = 0;
  totalInvoices = 0;

  constructor(private saleReportService: SaleReportService) {
    this.saleReportService.getListProduct().subscribe(data => {
      this.products = data;
      this.formSearch = new FormGroup({
        startDay: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
        endDay: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}[\\-\\/\\s]?((((0[13578])|(1[02]))[\\-\\/\\s]?(([0-2][0-9])|(3[01])))|(((0[469])|(11))[\\-\\/\\s]?(([0-2][0-9])|(30)))|(02[\\-\\/\\s]?[0-2][0-9]))$')]),
        typeReport: new FormControl('ALL', Validators.required),
        productId: new FormControl(this.products[0].id, Validators.required)
      });
    }, err => {
      console.log(err);
    });
  }

  ngOnInit(): void {
    this.changeTypeReport();
  }

  sumArr(arr) {
    let total = 0;
    for (let a of arr) {
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
      let productId = '';
      if (this.formSearch.get('typeReport').value == 'ID') {
        productId = this.formSearch.get('productId').value;
      }

      this.saleReportService.getAllSaleReports(startDay, endDay, productId).subscribe(data => {

        this.notFound = '';
        this.alertClass = '';

        for (let dt of data.data) {
          let date = dt.date.split("-");
          let newDate = date[0] + "/" + date[1];
          xValues.push(newDate);
          invoices.push(dt.invoiceQuantity);
          sales.push(dt.totalMoney);
          this.totalSales = this.sumArr(sales);
          this.totalInvoices = this.sumArr(invoices);
        }

        this.chart1 = new Chart('doanhThu', {
          type: 'bar',
          data: {
            labels: xValues,
            datasets: [{
              label: 'Doanh Thu (VN??)',
              // pointRadius: 3,
              // pointBackgroundColor: 'red',
              borderWidth: 1,
              barThickness: 30,
              borderColor: 'red',
              backgroundColor: 'red',
              data: sales,
              // fill: false,
              // tension: 0.5
            }]
          },
          options: {}
        });

        this.chart2 = new Chart('donHang', {
          type: 'bar',
          data: {
            labels: xValues,
            datasets: [{
              label: '????n h??ng ( ????n )',
              // fill: false,
              data: invoices.map(value => {
                return value.toFixed(0)
              }),
              // pointRadius: 3,
              // pointBackgroundColor: 'blue',
              backgroundColor: '#1589FF',
              borderColor: '#1589FF',
              borderWidth: 1,
              barThickness: 30
              // tension: 0.5
            }]
          },
          options: {}
        });
      }, error => {

        if (error.error.errorMap?.productId) {
          this.getProductId().setErrors({productId: true});
        } else {
          this.alertClass = 'text-center alert alert-danger';
          this.notFound = 'KH??NG T??M TH???Y D??? LI???U TH??CH H???P !';
        }
        this.totalInvoices = 0;
        this.totalSales = 0;
      });

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

    let type = this.formSearch.get('typeReport').value;

    if (type != 'ID') {
      this.formSearch.get('productId').disable();
    } else {
      this.formSearch.get('productId').enable();
    }
  }

  getProductFromQRCode(product: any) {
    this.product = product;
    console.log(product);
  }

  checkDay() {
    let date1 = new Date(this.formSearch.get('startDay')?.value);
    let date2 = new Date(this.formSearch.get('endDay')?.value);
    if (date1?.getTime() > date2?.getTime()) {
      this.formSearch.get('endDay').setErrors({errDate: true});
    }
  }

}
