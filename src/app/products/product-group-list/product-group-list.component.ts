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
import {ProductService} from '../product.service';
import {ProductGroupNewComponent} from '../product-group-new/product-group-new.component';
import {ProductGroup} from '../product';

@Component({
  selector: 'app-product-group-list',
  standalone: true,
  imports: [CommonModule, IonicModule, ProductGroupNewComponent],
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
        text: 'Share',
        data: {
          action: 'share',
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

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(groupName: string) {
    this.modal.dismiss(groupName, 'confirm');
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ProductGroupNewComponent,
    });
    await modal.present();

    const {data, role} = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.productService.addProductGroup(data || '');
    }
  }

  async presentActionSheet(productGroup: ProductGroup) {
    const actionSheet = await this.actionSheetCtrl.create(
      this.actionSheetButtons
    );

    await actionSheet.present();
    const result = await actionSheet.onDidDismiss();
    this.handleActionSheetResults(result, productGroup);
  }

  private handleActionSheetResults(
    result: OverlayEventDetail,
    productGroup: ProductGroup
  ) {
    if (result?.data?.action === 'delete') {
      this.productService.deleteProductGroup(productGroup);
    }
  }
}
