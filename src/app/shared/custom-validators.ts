import {inject} from '@angular/core';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {ProductService} from '../products/services';

export class CustomValidators {
  static uniqueProductGroupName(): ValidatorFn {
    const productService = inject(ProductService);
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value &&
        control.value.length >= 3 &&
        productService.existProductGroupByName(control.value)
        ? {notUniqueProductGroupName: {value: control.value}}
        : null;
    };
  }

  static noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return (control.value || '').trim().length
        ? null
        : {noWhitespaceValidator: {value: control.value}};
    };
  }
}
