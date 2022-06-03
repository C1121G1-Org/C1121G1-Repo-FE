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

  constructor(private homepageService: HomepageService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.homepageService.getProductBestseller().subscribe((productBestsellers) => {
      this.productBestsellers = productBestsellers;
    }, error => {
      console.log(error);
    });
  }

}
