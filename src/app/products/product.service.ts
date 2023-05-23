import {Injectable, signal} from '@angular/core';
import {ProductGroup} from './product';
import {Preferences} from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private PREFERENCES_PRODUCTGROUP_KEY = 'productGroup';
  productGroups = signal<ProductGroup[]>([]);

  constructor() {
    this.getProductGroups();
  }

  async getProductGroups() {
    const {value} = await Preferences.get({
      key: this.PREFERENCES_PRODUCTGROUP_KEY,
    });
    this.productGroups.set(value ? JSON.parse(value) : ([] as ProductGroup[]));
  }

  async addProductGroup(groupName: string) {
    this.productGroups.mutate((productGroups) =>
      productGroups.push({name: groupName})
    );

    //TODO: encapsulate in a storage service
    await Preferences.set({
      key: this.PREFERENCES_PRODUCTGROUP_KEY,
      value: JSON.stringify(this.productGroups()),
    });
  }

  async editProductGroup(
    productGroup: ProductGroup,
    newProductGroupName: string
  ) {
    this.productGroups.update((pgs) =>
      pgs.map((pg) =>
        pg.name === productGroup.name ? {name: newProductGroupName} : pg
      )
    );

    await Preferences.set({
      key: this.PREFERENCES_PRODUCTGROUP_KEY,
      value: JSON.stringify(this.productGroups()),
    });
  }

  async deleteProductGroup(productGroup: ProductGroup) {
    this.productGroups.update((pgs) =>
      pgs.filter((pg) => pg.name !== productGroup.name)
    );

    await Preferences.set({
      key: this.PREFERENCES_PRODUCTGROUP_KEY,
      value: JSON.stringify(this.productGroups()),
    });
  }

  existProductGroupByName(productGroupName: string): boolean {
    return !!this.findProductGroupByName(productGroupName);
  }

  private findProductGroupByName(
    productGroupName: string
  ): ProductGroup | undefined {
    const productGroupNameFormatted = productGroupName.toUpperCase().trim();
    const product = this.productGroups().find(
      (pg) => pg.name.toUpperCase() === productGroupNameFormatted
    );
    return product;
  }
}
