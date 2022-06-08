import {AbstractControl, ValidationErrors} from '@angular/forms';

export function gteValidateDate(control: AbstractControl): ValidationErrors | null {

  const v = control.value;
  const pickedDate = new Date(v);
  const todaysDate = new Date();
  console.log(todaysDate);
  if (pickedDate > todaysDate) {
    return { gteValidateDate: true, requiredValue: 'Bạn phải chọn ngày nhỏ hơn hoặc bằng ngày hiện tại' };
  }
  return null;
}
