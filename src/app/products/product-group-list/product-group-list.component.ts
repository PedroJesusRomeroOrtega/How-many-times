import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonModal, IonicModule} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {ProductService} from '../product.service';
import {ProductGroupNewComponent} from '../product-group-new/product-group-new.component';

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
  name = '';
  productGroups = this.productService.productGroups;

  constructor(private productService: ProductService) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm(groupName: string) {
    this.modal.dismiss(groupName, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.productService.addProductGroup(ev.detail.data || '');
    }
  }
}
