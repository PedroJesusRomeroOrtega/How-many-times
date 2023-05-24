import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./products/product-group-list/product-group-list.component').then(
        (m) => m.ProductGroupListComponent
      ),
  },
];
