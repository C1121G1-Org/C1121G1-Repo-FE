/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Interface: Product
*/
import {Category} from "./category";

export interface Product {
  id?: number;
  name?: string;
  price?: string;
  image?: string;
  // qrScan: string;
  screenSize?: string;
  camera?: string;
  selfie?: string;
  cpu?: string;
  memory?: string;
  otherDescription?: string;
  deleteFlag?: boolean;
  discount?:number;
  promotions?:string;
  fiveStarRating?:number;
  category?:Category;
}

