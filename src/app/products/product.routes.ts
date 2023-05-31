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
    path: 'product-group/:name',
    loadComponent: () =>
      import('./product-group-view/product-group-view.component').then(
        (m) => m.ProductGroupViewComponent
      ),
  },
];
