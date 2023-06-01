import {Routes} from '@angular/router';
import {productGroupSelectedResolver} from './product-group-selected.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-group-list/product-group-list.component').then(
        (m) => m.ProductGroupListComponent
      ),
  },
  {
    path: 'product-group/:name',
    loadComponent: () =>
      import('./product-group-view/product-group-view.component').then(
        (m) => m.ProductGroupViewComponent
      ),
    canMatch: [productGroupSelectedResolver],
  },
];
