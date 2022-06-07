import {AbstractControl, ValidationErrors} from '@angular/forms';

export function gteQuantityStorage(control: AbstractControl): ValidationErrors | null {

  const v = control.value;
  if (v !== null) {
    if (isNaN(v)) {
      console.log('khong la so');
      return { gteQuantityStorage: true, requiredValue: 'Bạn phải nhập số' };
    }

    if (v <= 0) {
      console.log('so be hon 0');
      return { gteQuantityStorage: true, requiredValue: 'Bạn phải nhập số lớn hơn 0' };
    }
  }
  return null;
}
