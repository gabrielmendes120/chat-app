import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { validateAllFormFieldsRequired } from 'src/app/validators/fieldsValidator';
import { SessionStorageHelper } from 'src/app/helper/session-storage-helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  msgError: string = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.msgError = null;
    this.form = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      validateAllFormFieldsRequired(this.form);
      return;
    }

    const email = this.form.get('email').value;
    const password = this.form.get('password').value;

    this.userService.login(email, password).subscribe(
      (response) => {
        alert('Login successful');
        SessionStorageHelper.setIdUser(response.id);
        this.router.navigate(['/chat']);
      },
      (error) => (this.msgError = error)
    );
  }
}
