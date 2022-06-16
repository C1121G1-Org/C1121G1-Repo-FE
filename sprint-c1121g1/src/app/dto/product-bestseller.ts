/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Interface: ProductBestseller
*/
import {Category} from '../models/category';

export interface ProductBestseller {
  id: number;
  name: string;
  price: number;
  image: string;
  screenSize: string;
  camera: string;
  selfie: string;
  cpu: string;
  memory: string;
  otherDescription: string;
  productQuantity: number;
  discount: number;
  promotions: string;
  fiveStarRating: number;
  dateCreate: string;
  category: Category;
}
