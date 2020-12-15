import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-field-error-display',
  templateUrl: './field-error-display.component.html',
  styleUrls: ['./field-error-display.component.scss'],
})
export class FieldErrorDisplayComponent {
  @Input() nameField: string;

  @Input() formError: AbstractControl;

  @Input() customErrorMsg: string;

  constructor() {}
}

