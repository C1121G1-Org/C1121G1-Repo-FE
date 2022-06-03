/*
  Created by khoaVC
  Time: 10:00 03/06/2022
  Interface: StorageDto
*/

export interface StorageDto {
  id?: number;

  createdDate?: string;

  status?: boolean;

  quantity?: number;

  createdEmployee?: number;

  product?: number;

  supplier?: number;

  deleteFlag?: boolean;
}
