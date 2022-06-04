export interface Product {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  // qrScan: string;
  screenSize: string;
  camera?: string;
  selfie?: string;
  cpu?: string;
  memory?: string;
  otherDescription?: string;
  deleteFlag?: boolean;
}
