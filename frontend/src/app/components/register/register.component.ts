import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { validateAllFormFieldsRequired } from 'src/app/validators/fieldsValidator';
import { requiredFileType } from 'src/app/validators/fileValidator';
import { strengthPassword } from 'src/app/validators/passwordValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
 
  form: FormGroup;

  msgError: string = null;

  constructor(
    private registerSevice: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        strengthPassword(),
      ]),
      username: new FormControl(null, Validators.required),
      avatar: new FormControl(null, [
        Validators.required,
        requiredFileType('png'),
      ]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      validateAllFormFieldsRequired(this.form);
      return;
    }
    this.registerUser();
  }

  registerUser() {
    this.registerSevice.registerUser(this.populateFormData()).subscribe(
      () => {
        alert(`Registered with successful`);
        this.router.navigate(['/']);
      },
      (error) => (this.msgError = error)
    );
  }

  populateFormData() {
    const data = new FormData();
    Object.keys(this.form.controls).forEach((field) => {
      console.log(field);
      const value = this.form.get(field).value;
      data.append(field, value);
    });
    return data;
  }
}
