import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule, ModalController} from '@ionic/angular';
import {ProductService} from '../services';
import {Product} from '../product';
import {ProductNewComponent} from '../product-new/product-new.component';

@Component({
  selector: 'app-product-group-view',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-group-view.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupViewComponent {
  private productService = inject(ProductService);
  private modalCtrl = inject(ModalController);

  selectedProductGroup = this.productService.selectedProductGroup;

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ProductNewComponent,
    });
    await modal.present();
    const {data, role} = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.handleModalResults(data);
    }
  }

  private async handleModalResults(result: Product) {
    // if (productGroup) {
    //   await this.productService.editProduct(productGroup, result || '');
    // } else {
    await this.productService.addProduct(result);
    // }
  }
}
