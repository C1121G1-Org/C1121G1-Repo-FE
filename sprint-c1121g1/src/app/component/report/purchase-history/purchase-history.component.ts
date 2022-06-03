import {Component, OnInit} from '@angular/core';
import {ReportAndHistoryService} from '../../../services/report/report-and-history.service';
import {PurchaseHistoryDto} from '../../../dto/purchase-history-dto';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ReportCustomerDto} from '../../../dto/report-customer-dto';
import {PurchaseProductDto} from "../../../dto/purchase-product-dto";

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

  productPageNumber = 0;
  productTotalPages = 0;
  invoiceIdPage: number;

  pageNumber = 0;
  totalPages = 0;

  id: number;
  customerReport: ReportCustomerDto = {};

  constructor(private reportService: ReportAndHistoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.getInfoCustomer();
      this.detailPurchaseHitory();
    });
  }

  ngOnInit(): void {

  }

  detailPurchaseHitory() {
    this.reportService.getPurchaseHistory(this.id, this.pageNumber).subscribe(purchaseHitories => {
      this.purchaseHistories = purchaseHitories.content;
      this.totalPages = purchaseHitories.totalPages;
      this.pageNumber = purchaseHitories.pageabel.pageNumber;
    });
  }

  previousPage() {
    this.reportService.getPurchaseHistory(this.id, this.pageNumber - 1).subscribe(purchaseHitories => {
      this.purchaseHistories = purchaseHitories.content;
      if (this.pageNumber - 1 <= 0) {
        this.pageNumber = 0;
      } else {
        this.pageNumber = this.pageNumber - 1;
      }
    });
  }

  nextPage() {
    this.reportService.getPurchaseHistory(this.id, this.pageNumber + 1).subscribe(purchaseHitories => {
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
      this.productPageNumber = purchaseProducts.pageabel.pageNumber;
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
