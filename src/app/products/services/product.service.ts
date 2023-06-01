import {Injectable, inject, signal} from '@angular/core';
import {ProductStorageService} from './product-storage.service';
import {ProductGroup} from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productStorageService = inject(ProductStorageService);

  productGroups = signal<ProductGroup[]>([]);
  selectedProductGroup = signal<ProductGroup | undefined>(undefined);

  constructor() {
    this.getProductGroups();
  }

  productGroupSelect(productGroup: ProductGroup) {
    const foundProductGroup = this.productGroups().find(
      (pg) => pg.name === productGroup.name
    );
    this.selectedProductGroup.set(foundProductGroup);
  }

  async addProductGroup(groupName: string) {
    this.productGroups.mutate((productGroups) =>
      productGroups.push({name: groupName, products: [{name: 'cabrinha 8m'}]})
    );

    await this.productStorageService.setProductGroups(this.productGroups());
  }

  async editProductGroup(
    productGroup: ProductGroup,
    newProductGroupName: string
  ) {
    this.productGroups.update((pgs) =>
      pgs.map((pg) =>
        pg.name === productGroup.name ? {...pg, name: newProductGroupName} : pg
      )
    );

    await this.productStorageService.setProductGroups(this.productGroups());
  }

  async deleteProductGroup(productGroup: ProductGroup) {
    this.productGroups.update((pgs) =>
      pgs.filter((pg) => pg.name !== productGroup.name)
    );

    await this.productStorageService.setProductGroups(this.productGroups());
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

  private async getProductGroups() {
    this.productGroups.set(await this.productStorageService.getProductGroups());
  }
}
