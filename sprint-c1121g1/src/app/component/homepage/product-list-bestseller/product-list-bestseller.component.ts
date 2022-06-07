import {Component, OnInit} from '@angular/core';
import {HomepageService} from '../../../services/homepage/homepage.service';
import {ProductBestseller} from '../../../dto/product-bestseller';
import {Category} from "../../../models/category";

@Component({
  selector: 'app-product-list-bestseller',
  templateUrl: './product-list-bestseller.component.html',
  styleUrls: ['./product-list-bestseller.component.css']
})
// Create by chienLV
// Time: 16h00 03/06/2022
// Function: get list product bestseller from database
export class ProductListBestsellerComponent implements OnInit {
  productBestsellers: ProductBestseller[] = [];
  topfiveproductBestsellers: ProductBestseller[] = [];
  toptenproductBestsellers: ProductBestseller[] = [];

  categorires: Category[] = [];
  topFiveCategories: Category[] = [];
  flagProductBestseller = false;
  flagProductNewest = false;
  flagCategory = false;


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
