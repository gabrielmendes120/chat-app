import { FormControl, FormGroup } from '@angular/forms';

export function validateAllFormFieldsRequired(form: FormGroup) {
  Object.keys(form.controls).forEach((field) => {
    const control = form.get(field);
    console.log(control);
    if (control instanceof FormControl) {
      control.markAsTouched({ onlySelf: true });
    } else if (control instanceof FormGroup) {
      this.validateAllFormFieldsRequired(control);
    }
  });
}
