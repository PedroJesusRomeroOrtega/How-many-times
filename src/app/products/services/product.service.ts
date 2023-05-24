import {Injectable, signal} from '@angular/core';
import {ProductStorageService} from './product-storage.service';
import {ProductGroup} from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productGroups = signal<ProductGroup[]>([]);

  constructor(private productStorageService: ProductStorageService) {
    this.getProductGroups();
  }

  async addProductGroup(groupName: string) {
    this.productGroups.mutate((productGroups) =>
      productGroups.push({name: groupName})
    );

    await this.productStorageService.setProductGroups(this.productGroups());
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
