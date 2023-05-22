import {inject} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ProductService} from '../products';

export class CustomValidators {
  static uniqueProductGroupName(): ValidatorFn {
    const productService = inject(ProductService);
    return (control: AbstractControl): ValidationErrors | null => {
      return productService.existProductGroupByName(control.value)
        ? {notUniqueProductGroupName: {value: control.value}}
        : null;
    };
  }
}
