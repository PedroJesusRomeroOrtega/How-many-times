import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, ModalController} from '@ionic/angular';
import {CustomValidators, errorMessage} from 'src/app/shared';

@Component({
  selector: 'app-product-group-new',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  templateUrl: './product-group-new.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupNewComponent implements OnInit {
  MAX_PRODUCTGROUP_NAME_LENGTH = 30;
  @Input() name = '';
  productGroupName = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(this.MAX_PRODUCTGROUP_NAME_LENGTH),
    CustomValidators.uniqueProductGroupName(),
  ]);
  errorMessage = errorMessage;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.productGroupName.setValue(this.name);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.productGroupName.value, 'confirm');
  }
}
