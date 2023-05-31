import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ProductService} from '../services';

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

  selectedProductGroup = this.productService.selectedProductGroup;
}
