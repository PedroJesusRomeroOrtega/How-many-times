import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {CustomValidators, errorMessage} from 'src/app/shared';
import {ProductGroup} from '../product';

@Component({
  selector: 'app-product-group-edit',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './product-group-edit.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupEditComponent implements OnInit {
  MAX_PRODUCTGROUP_NAME_LENGTH = 30;
  @Input() productGroup: ProductGroup | undefined;
  productGroupForm = this.fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(this.MAX_PRODUCTGROUP_NAME_LENGTH),
        CustomValidators.uniqueProductGroupName(),
        CustomValidators.noWhitespaceValidator(),
      ],
    ],
  });
  errorMessage = errorMessage;

  get name() {
    return this.productGroupForm.get('name') as FormControl<string>;
  }

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productGroupForm.patchValue({name: this.productGroup?.name || ''});
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    const editedProductGroup = this.productGroup
      ? {
          ...this.productGroup,
          ...this.productGroupForm.value,
        }
      : {
          ...this.productGroupForm.value,
          products: [],
        };

    return this.modalCtrl.dismiss(editedProductGroup, 'confirm');
  }
}
