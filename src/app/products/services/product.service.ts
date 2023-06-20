import {Injectable, inject, signal} from '@angular/core';
import {ProductStorageService} from './product-storage.service';
import {Product, ProductGroup} from '../product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productStorageService = inject(ProductStorageService);

  productGroups = signal<ProductGroup[]>([]);
  selectedProductGroup = signal<ProductGroup | undefined>(undefined);

  constructor() {
    this.loadProductGroupsFromStorage();
  }

  async addProduct(product: Product) {
    if (this.selectedProductGroup()) {
      // TODO: check if the product exist
      this.selectedProductGroup.mutate((productGroup) =>
        productGroup?.products?.push(product)
      );

      await this.productStorageService.setProductGroups(this.productGroups());
    }
  }

  async editProduct(oldProduct: Product, editedProduct: Product) {
    if (!this.selectedProductGroup()) return;

    const selectedProductGroup = this.selectedProductGroup() as ProductGroup;

    const productsWithEdited = selectedProductGroup.products.map((p) =>
      p.name === oldProduct.name ? {...p, ...editedProduct} : p
    );

    this.selectedProductGroup.set({
      ...selectedProductGroup,
      products: productsWithEdited,
    });

    const productGroupsFiltered = this.filterProductGroup(
      this.productGroups(),
      selectedProductGroup
    );
    const productGroupsWithProductEdited = [
      ...productGroupsFiltered,
      this.selectedProductGroup() as ProductGroup,
    ];
    this.productGroups.set(productGroupsWithProductEdited);

    await this.productStorageService.setProductGroups(
      productGroupsWithProductEdited
    );
  }

  async deleteProduct(product: Product) {
    if (!this.selectedProductGroup()) return;

    const selectedProductGroup = this.selectedProductGroup() as ProductGroup;

    const selectedProductGroupWithProductDeleted =
      this.deleteProductFromProductGroup(selectedProductGroup, product);

    this.selectedProductGroup.set(selectedProductGroupWithProductDeleted);

    const productGroupsFiltered = this.filterProductGroup(
      this.productGroups(),
      selectedProductGroup
    );
    const productGroupsWithProductDeleted = [
      ...productGroupsFiltered,
      this.selectedProductGroup() as ProductGroup,
    ];
    this.productGroups.set(productGroupsWithProductDeleted);

    await this.productStorageService.setProductGroups(
      productGroupsWithProductDeleted
    );
  }

  private deleteProductFromProductGroup = (
    productGroup: ProductGroup,
    product: Product
  ) =>
    ({
      ...productGroup,
      products: productGroup?.products.filter((p) => p.name !== product.name),
    } as ProductGroup);

  productGroupSelect(productGroup: ProductGroup) {
    const foundProductGroup = this.productGroups().find(
      (pg) => pg.name === productGroup.name
    );
    this.selectedProductGroup.set(foundProductGroup);
  }

  async addProductGroup(productGroup: ProductGroup) {
    this.addProductGroupFromClient(productGroup);

    await this.productStorageService.setProductGroups(this.productGroups());
  }

  private addProductGroupFromClient(productGroup: ProductGroup) {
    this.productGroups.mutate((productGroups) =>
      productGroups.push(productGroup)
    );
  }

  async editProductGroup(
    oldProductGroup: ProductGroup,
    editedProductGroup: ProductGroup
  ) {
    this.editProductGroupFromClient(oldProductGroup, editedProductGroup);

    await this.productStorageService.setProductGroups(this.productGroups());
  }

  private editProductGroupFromClient(
    oldProductGroup: ProductGroup,
    editedProductGroup: ProductGroup
  ) {
    this.productGroups.update((pgs) =>
      pgs.map((pg) =>
        pg.name === oldProductGroup.name ? {...pg, ...editedProductGroup} : pg
      )
    );
  }

  async deleteProductGroup(productGroup: ProductGroup) {
    this.deleteProductGroupFromClient(productGroup);

    await this.productStorageService.setProductGroups(this.productGroups());
  }

  private deleteProductGroupFromClient(productGroup: ProductGroup) {
    this.productGroups.update((pgs) =>
      this.filterProductGroup(pgs, productGroup)
    );
  }

  private filterProductGroup(
    productGroups: ProductGroup[],
    productGroup: ProductGroup
  ) {
    return productGroups.filter((pg) => pg.name !== productGroup?.name);
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

  private async loadProductGroupsFromStorage() {
    this.productGroups.set(await this.productStorageService.getProductGroups());
  }
}
