import {Component, OnInit} from '@angular/core';
import {HomepageService} from '../../../services/homepage/homepage.service';
import {ProductBestseller} from '../../../dto/product-bestseller';

@Component({
  selector: 'app-product-list-bestseller',
  templateUrl: './product-list-bestseller.component.html',
  styleUrls: ['./product-list-bestseller.component.css']
})
export class ProductListBestsellerComponent implements OnInit {
  productBestsellers: ProductBestseller[] = [];

  topfiveproductBestsellers: ProductBestseller[] = [];
  toptenproductBestsellers: ProductBestseller[] = [];
  // rateNumber: number = Math.round(Math.random() * 100);
  constructor(private homepageService: HomepageService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.homepageService.getProductBestseller().subscribe((productBestsellers) => {
      this.productBestsellers = productBestsellers;
      for (let i = 0; i < 5; i++) {
        this.topfiveproductBestsellers.push(this.productBestsellers[i]);
      }
      for (let i = 5; i < 10; i++) {
        this.toptenproductBestsellers.push(this.productBestsellers[i]);
      }
    }, error => {
      console.log(error);
    });
  }

}
