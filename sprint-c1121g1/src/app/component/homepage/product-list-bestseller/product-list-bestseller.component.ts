import {Component, OnInit} from '@angular/core';
import {HomepageService} from '../../../services/homepage/homepage.service';
import {ProductBestseller} from '../../../dto/product-bestseller';
import {Category} from "../../../models/category";
import {CategoryService} from "../../../services/category/category.service";

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
  productNewests: ProductBestseller[] = [];
  topfiveproductNewests: ProductBestseller[] = [];
  toptenproductNewests: ProductBestseller[] = [];
  categorires: Category[] = [];
  topFiveCategories: Category[] = [];
  flagProductBestseller = false;
  flagProductNewest = false;
  flagCategory = false;

  constructor(private homepageService: HomepageService, private categoryService: CategoryService) {
  }

  ngOnInit(): void {
    this.getAllProductBestSeller();
    this.getAllProductNewest();
    this.getAllCategory();
  }

  getAllProductBestSeller() {
    this.homepageService.getProductBestseller().subscribe((productBestsellers) => {
      this.productBestsellers = productBestsellers;
      if (this.productBestsellers.length === 0) {
        this.flagProductBestseller = true;
      }
    }, error => {
      this.flagProductBestseller = true;
      console.log(error);
    });
  }

  getAllProductNewest() {
    this.homepageService.getProductNewest().subscribe((productNewests) => {
      this.productNewests = productNewests;
      this.topfiveproductNewests = this.productNewests.filter((item, index) => index < 5);
      this.toptenproductNewests = this.productNewests.filter((item, index) => index >= 5);
      if (this.productBestsellers.length === 0) {
        this.flagProductNewest = true;
      }
    }, error => {
      this.flagProductNewest = true;
      console.log(error);
    });
  }

  getAllCategory() {
    this.categoryService.getAll().subscribe((categories) => {
      this.categorires = categories;
      this.topFiveCategories = this.categorires.filter((item, index) => index < 5);
      if (categories.length === 0) {
        this.flagCategory = true;
      }
    }, error => {
      console.log(error);
      this.flagCategory = true;
    });
  }

}
