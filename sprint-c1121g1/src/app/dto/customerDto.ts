export class CustomerDto {
  id: number;
  customerName: string;
  phoneNumber : string;
  dateOfBirth: string;
  email: string;
  address: string;
  gender:boolean;


  constructor(id: number, customerName: string, phoneNumber: string, dateOfBirth: string, email: string, address: string, gender: boolean) {
    this.id = id;
    this.customerName = customerName;
    this.phoneNumber = phoneNumber;
    this.dateOfBirth = dateOfBirth;
    this.email = email;
    this.address = address;
    this.gender = gender;
  }


}
