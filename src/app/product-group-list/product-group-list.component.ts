import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-product-group-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-group-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupListComponent {
  productGroups = signal<ProductGroup[]>([
    {name: 'Kitesurf'},
    {name: 'Bikes'},
    {name: 'Scuba'},
  ]);

  addProductGroup() {
    this.productGroups.mutate((productGroups) =>
      productGroups.push({name: 'PaddleSurf'})
    );
  }
}

interface ProductGroup {
  name: string;
}
