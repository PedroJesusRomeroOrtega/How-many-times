import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, ModalController} from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CustomValidators, errorMessage} from 'src/app/shared';

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent {
  MAX_PRODUCT_NAME_LENGTH = 30;
  errorMessage = errorMessage;
  productForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(this.MAX_PRODUCT_NAME_LENGTH),
        CustomValidators.uniqueProductGroupName(),
        CustomValidators.noWhitespaceValidator(),
      ],
    ],
  });

  get name() {
    return this.productForm.get('name') as FormControl<string>;
  }

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.productForm.value, 'confirm');
  }
}
