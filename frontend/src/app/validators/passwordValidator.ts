import { FormControl, ValidatorFn} from '@angular/forms';

export function strengthPassword(): ValidatorFn | null {
  return (control: FormControl) => {
    const password = control.value;
    const reg = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');
    if (!reg.test(password)) {
      return {
        strengthPasswordInvalid: true,
      };
    }
    return null;
  };
}
