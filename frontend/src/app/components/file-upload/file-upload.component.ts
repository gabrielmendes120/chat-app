import {
  Component,
  OnInit,
  Input,
  HostListener,
  ElementRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true,
    },
  ],
})
export class FileUploadComponent implements OnInit, ControlValueAccessor {
  @Input() avatarError: AbstractControl;

  previewUrl: any;

  private file: File | null = null;

  onChange = (_) => {};

  constructor(private host: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this.previewUrl = './assets/images/default-avatar.png';
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    this.preview();
  }

  preview() {
    if (!this.avatarError.invalid) {
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
    }
  }

  writeValue(obj: any): void {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
