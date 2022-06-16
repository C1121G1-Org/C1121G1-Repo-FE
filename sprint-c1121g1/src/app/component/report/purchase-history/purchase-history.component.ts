import {Component, OnInit} from '@angular/core';
import {ReportAndHistoryService} from '../../../services/report/report-and-history.service';
import {PurchaseHistoryDto} from '../../../dto/purchase-history-dto';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ReportCustomerDto} from '../../../dto/report-customer-dto';
import {PurchaseProductDto} from '../../../dto/purchase-product-dto';

/*
    Created by TuanNQ
    Time: 11:00 02/06/2022
    Function: Show detail purchase history
*/
@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

  purchaseHistories: PurchaseHistoryDto[] = [];

  purchaseProducts: PurchaseProductDto[] = [];

  checkPurchaseHistories = true;

  productPageNumber = 0;
  productTotalPages = 0;
  invoiceIdPage: number;

  pageNumber = 0;
  totalPages = 0;

  pageSize = 0;

  id: number;
  customerReport: ReportCustomerDto = {};

  startDate = '01-01-1800';
  endDate = '31-12-2100';

  constructor(private reportService: ReportAndHistoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getInfoCustomer();
      console.log(this.endDate);
      console.log(this.startDate);

      this.detailPurchaseHitory();
    });
  }

  ngOnInit(): void {

  }

  detailPurchaseHitory() {
    this.reportService.getPurchaseHistory(this.id, this.startDate, this.endDate, this.pageNumber)
      .subscribe(purchaseHitories => {
        if (purchaseHitories == null) {
          this.checkPurchaseHistories = false;
        } else {
          this.checkPurchaseHistories = true;

          this.purchaseHistories = purchaseHitories.content;
          this.totalPages = purchaseHitories.totalPages;
          this.pageNumber = purchaseHitories.pageable.pageNumber;
          this.pageSize = purchaseHitories.pageable.pageSize;
        }

      });
  }

  previousPage() {
    this.reportService.getPurchaseHistory(this.id, this.startDate, this.endDate, this.pageNumber - 1)
      .subscribe(purchaseHitories => {
        this.purchaseHistories = purchaseHitories.content;
        if (this.pageNumber - 1 <= 0) {
          this.pageNumber = 0;
        } else {
          this.pageNumber = this.pageNumber - 1;
        }
      });
  }

  nextPage() {
    this.reportService.getPurchaseHistory(this.id, this.startDate, this.endDate, this.pageNumber + 1)
      .subscribe(purchaseHitories => {
        this.purchaseHistories = purchaseHitories.content;
        if (this.pageNumber + 1 >= this.totalPages) {
          this.pageNumber = this.totalPages - 1;
        } else {
          this.pageNumber = this.pageNumber + 1;
        }
      });
  }

  getInfoCustomer() {
    this.reportService.getInfoCustomer(this.id).subscribe(customerReport => {
      this.customerReport = customerReport;
    });
  }

  getPurchaseProduct(invoiceId: number) {
    this.reportService.getPurchaseProduct(invoiceId, this.productPageNumber).subscribe(purchaseProducts => {
      this.invoiceIdPage = invoiceId;
      this.purchaseProducts = purchaseProducts.content;
      this.productTotalPages = purchaseProducts.totalPages;
      this.productPageNumber = purchaseProducts.pageable.pageNumber;
      this.pageSize = purchaseProducts.pageable.pageSize;
    });
  }

  productPreviousPage() {
    this.reportService.getPurchaseProduct(this.invoiceIdPage, this.productPageNumber - 1)
      .subscribe(purchaseProducts => {
        this.purchaseProducts = purchaseProducts.content;
        if (this.productPageNumber - 1 <= 0) {
          this.productPageNumber = 0;
        } else {
          this.productPageNumber = this.productPageNumber - 1;
        }
      });
  }

  productNextPage() {
    this.reportService.getPurchaseProduct(this.invoiceIdPage, this.productPageNumber + 1)
      .subscribe(purchaseProducts => {
        this.purchaseProducts = purchaseProducts.content;
        if (this.productPageNumber + 1 >= this.productTotalPages) {
          this.productPageNumber = this.productTotalPages - 1;
        } else {
          this.productPageNumber = this.productPageNumber + 1;
        }
      });
  }
}
