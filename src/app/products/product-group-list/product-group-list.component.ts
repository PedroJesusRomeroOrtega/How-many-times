import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  ActionSheetController,
  ActionSheetOptions,
  IonModal,
  IonicModule,
  ModalController,
} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {ProductGroupNewComponent} from '../product-group-new/product-group-new.component';
import {ProductGroup} from '../product';
import {ProductService} from '../services';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-product-group-list',
  standalone: true,
  imports: [CommonModule, IonicModule, ProductGroupNewComponent, RouterLink],
  templateUrl: './product-group-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupListComponent {
  @ViewChild(IonModal) modal!: IonModal;
  productGroups = this.productService.productGroups;
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

  constructor(
    private productService: ProductService,
    private actionSheetCtrl: ActionSheetController,
    private modalCtrl: ModalController
  ) {}

  async openModal(productGroup: ProductGroup | undefined = undefined) {
    const modal = await this.modalCtrl.create({
      component: ProductGroupNewComponent,
      componentProps: {'name': productGroup?.name},
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.handleModalResults(productGroup, data);
    }
  }

  async presentActionSheet(productGroup: ProductGroup) {
    const actionSheet = await this.actionSheetCtrl.create(
      this.actionSheetButtons
    );

    await actionSheet.present();
    const result = await actionSheet.onWillDismiss();
    this.handleActionSheetResults(result, productGroup);
  }

  private async handleActionSheetResults(
    result: OverlayEventDetail,
    productGroup: ProductGroup
  ) {
    const action = result?.data?.action;
    if (action === 'delete') {
      await this.productService.deleteProductGroup(productGroup);
    } else if (action === 'edit') {
      this.openModal(productGroup);
    }
  }

  private async handleModalResults(
    productGroup: ProductGroup | undefined,
    result: string | undefined
  ) {
    if (productGroup) {
      await this.productService.editProductGroup(productGroup, result || '');
    } else {
      await this.productService.addProductGroup(result || '');
    }
  }
}
