import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ActionSheetController,
  ActionSheetOptions,
  IonicModule,
  ModalController,
} from '@ionic/angular';
import {ProductService} from '../services';
import {Product} from '../product';
import {ProductNewComponent} from '../product-new/product-new.component';
import {OverlayEventDetail} from '@ionic/core';

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
  private actionSheetCtrl = inject(ActionSheetController);

  selectedProductGroup = this.productService.selectedProductGroup;
  private actionSheetButtons: ActionSheetOptions = {
    header: 'Actions',
    buttons: [
      {
        text: 'Delete',
        role: 'destructive',
        data: {
          action: 'delete',
        },
      },
      // {
      //   text: 'Edit',
      //   data: {
      //     action: 'edit',
      //   },
      // },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ],
  };

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

  async presentActionSheet(productGroup: Product) {
    const actionSheet = await this.actionSheetCtrl.create(
      this.actionSheetButtons
    );

    await actionSheet.present();
    const result = await actionSheet.onWillDismiss();
    this.handleActionSheetResults(result, productGroup);
  }

  private async handleActionSheetResults(
    result: OverlayEventDetail,
    product: Product
  ) {
    const action = result?.data?.action;
    if (action === 'delete') {
      await this.productService.deleteProduct(product);
    }
    //  else if (action === 'edit') {
    //   this.openModal(productGroup);
    // }
  }

  private async handleModalResults(result: Product) {
    // if (productGroup) {
    //   await this.productService.editProduct(productGroup, result || '');
    // } else {
    await this.productService.addProduct(result);
    // }
  }
}
