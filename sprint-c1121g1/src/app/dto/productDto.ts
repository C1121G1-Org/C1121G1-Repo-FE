
import {CategoryDto} from './categoryDto';

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
  categoryDto?: CategoryDto;
}
