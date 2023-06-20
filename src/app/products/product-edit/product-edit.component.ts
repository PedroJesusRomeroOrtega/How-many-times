import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, ModalController} from '@ionic/angular';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {CustomValidators, errorMessage} from 'src/app/shared';
import {Product} from '../product';

@Component({
  selector: 'app-product-new',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './product-edit.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
  MAX_PRODUCT_NAME_LENGTH = 30;
  @Input() product: Product | undefined;
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
  errorMessage = errorMessage;

  get name() {
    return this.productForm.get('name') as FormControl<string>;
  }

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm.patchValue({name: this.product?.name || ''});
  }

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    const editedProduct = this.product
      ? {...this.product, ...this.productForm.value}
      : {...this.productForm.value};

    return this.modalCtrl.dismiss(editedProduct, 'confirm');
  }
}
