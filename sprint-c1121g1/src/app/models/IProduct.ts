/*
 Created by LongNHL
 Time: 9:30 2/06/2022
 Function: create invoice
 */
export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  screenSize?: string;
  camera?: string;
  selfie?: string;
  cpu?: string;
  memory?: string;
  otherDescription?: string;
  deleteFlag?: boolean;
  quantity?: number;
}
