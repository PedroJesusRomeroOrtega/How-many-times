import {FormControl} from '@angular/forms';

export const defaultErrors = new Map<string, string>();
defaultErrors.set('required', 'Is required');
defaultErrors.set('minlength', 'Text must be longer');
defaultErrors.set('maxlength', 'Text must be shorter');
defaultErrors.set('notUniqueProductGroupName', 'This name already exists');

export const errorMessage = (formControl: FormControl): string => {
  const errors = formControl.errors;
  if (errors) {
    const firstKey = Object.keys(errors)[0];
    const getError = defaultErrors.get(firstKey);
    return getError || '';
  }
  return '';
};
