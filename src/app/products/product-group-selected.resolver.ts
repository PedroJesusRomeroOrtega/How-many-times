import {ResolveFn, Router, UrlTree} from '@angular/router';
import {ProductService} from './services';
import {inject} from '@angular/core';

export const productGroupSelectedResolver: ResolveFn<
  boolean | UrlTree
> = () => {
  const productService = inject(ProductService);
  const router = inject(Router);
  if (productService.selectedProductGroup()) {
    return true;
  } else {
    return router.createUrlTree(['']);
  }
};
