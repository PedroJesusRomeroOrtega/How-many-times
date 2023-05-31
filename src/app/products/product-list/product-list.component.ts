import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {ProductService} from '../services';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './product-list.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private productService = inject(ProductService);

  selectedProductGroup = this.productService.selectedProductGroup;
}
