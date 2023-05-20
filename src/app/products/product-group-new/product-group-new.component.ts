import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

@Component({
  selector: 'app-product-group-new',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './product-group-new.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGroupNewComponent {
  name = '';
  @Output() cancelEvent = new EventEmitter();
  @Output() confirmEvent = new EventEmitter<string>();

  cancel() {
    this.cancelEvent.emit();
  }

  confirm() {
    this.confirmEvent.emit(this.name);
  }
}
