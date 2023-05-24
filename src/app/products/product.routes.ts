import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./product-group-list/product-group-list.component').then(
        (m) => m.ProductGroupListComponent
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
];
