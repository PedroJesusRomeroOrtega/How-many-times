import {Injectable, signal} from '@angular/core';
import {ProductGroup} from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productGroups = signal<ProductGroup[]>([
    {name: 'Kitesurf'},
    {name: 'Bikes'},
    {name: 'Scuba'},
  ]);

  addProductGroup(groupName: string) {
    this.productGroups.mutate((productGroups) =>
      productGroups.push({name: groupName})
    );
  }

  deleteProductGroup(productGroup: ProductGroup) {
    this.productGroups.update((productGroups) =>
      productGroups.filter((pg) => pg.name !== productGroup.name)
    );
  }
}
