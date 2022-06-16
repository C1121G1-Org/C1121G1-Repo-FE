import {AbstractControl, ValidationErrors} from '@angular/forms';

export function gteValidateDate(control: AbstractControl): ValidationErrors | null {

  const v = control.value;
  const pickedDate = new Date(v);
  const todaysDate = new Date();
  const minDate = new Date('01-01-1970');
  if (pickedDate > todaysDate) {
    return { gteValidateDate: true, requiredValue: 'Bạn phải chọn ngày nhỏ hơn hoặc bằng ngày hiện tại!' };
  }
  if (pickedDate < minDate) {
    return { gteValidateDate: true, requiredValue: 'Bạn phải chọn ngày lớn hơn hoặc bằng ngày 01-01-1970!' };
  }
  return null;
}
