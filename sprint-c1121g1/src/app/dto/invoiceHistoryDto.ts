interface InvoiceHistoryDto {
  id?: number;
  createDate?: string;
  createTime?: string;
  payments?: string;
  customer?: CustomerDto;
  product?: ProductDto;
  totalMoney?: number;
  quantity?: number;
}
