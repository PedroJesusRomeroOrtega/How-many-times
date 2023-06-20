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
import {ProductEditComponent} from '../product-edit/product-edit.component';
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
      {
        text: 'Edit',
        data: {
          action: 'edit',
        },
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
    ],
  };

  async openModal(product: Product | undefined = undefined) {
    const modal = await this.modalCtrl.create({
      component: ProductEditComponent,
      componentProps: {'product': product},
    });
    await modal.present();
    const {data: editedProduct, role} = await modal.onWillDismiss<Product>();
    if (role === 'confirm') {
      this.handleModalResults(product, editedProduct as Product);
    }
  }

  async presentActionSheet(product: Product) {
    const actionSheet = await this.actionSheetCtrl.create(
      this.actionSheetButtons
    );

    await actionSheet.present();
    const result = await actionSheet.onWillDismiss();
    this.handleActionSheetResults(result, product);
  }

  private async handleActionSheetResults(
    result: OverlayEventDetail,
    product: Product
  ) {
    const action = result?.data?.action;
    if (action === 'delete') {
      await this.productService.deleteProduct(product);
    } else if (action === 'edit') {
      this.openModal(product);
    }
  }

  private async handleModalResults(
    oldProduct: Product | undefined,
    editedProduct: Product
  ) {
    if (oldProduct) {
      await this.productService.editProduct(oldProduct, editedProduct);
    } else {
      await this.productService.addProduct(editedProduct);
    }
  }
}
