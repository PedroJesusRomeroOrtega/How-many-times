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

  editProductGroup(productGroup: ProductGroup, newProductGroupName: string) {
    this.productGroups.update((pgs) =>
      pgs.map((pg) =>
        pg.name === productGroup.name ? {name: newProductGroupName} : pg
      )
    );
  }

  deleteProductGroup(productGroup: ProductGroup) {
    this.productGroups.update((pgs) =>
      pgs.filter((pg) => pg.name !== productGroup.name)
    );
  }
}
