import {Injectable} from '@angular/core';
import {Preferences} from '@capacitor/preferences';
import {ProductGroup} from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductStorageService {
  private PREFERENCES_PRODUCTGROUP_KEY = 'productGroup';

  async getProductGroups() {
    const {value} = await Preferences.get({
      key: this.PREFERENCES_PRODUCTGROUP_KEY,
    });
    return value ? JSON.parse(value) : ([] as ProductGroup[]);
  }

  async setProductGroups(productGroups: ProductGroup[]) {
    await Preferences.set({
      key: this.PREFERENCES_PRODUCTGROUP_KEY,
      value: JSON.stringify(productGroups),
    });
  }
}
