import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  signal,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonModal, IonicModule} from '@ionic/angular';
import {OverlayEventDetail} from '@ionic/core/components';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-product-group-list',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './product-group-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupListComponent {
  @ViewChild(IonModal) modal!: IonModal;
  name = '';
  productGroups = signal<ProductGroup[]>([
    {name: 'Kitesurf'},
    {name: 'Bikes'},
    {name: 'Scuba'},
  ]);

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.addProductGroup(ev.detail.data || '');
    }
  }

  private addProductGroup(name: string) {
    this.productGroups.mutate((productGroups) => productGroups.push({name}));
  }
}

interface ProductGroup {
  name: string;
}
