import {Component} from '@angular/core';
import {IonicModule} from '@ionic/angular';
import {ProductGroupListComponent} from './products';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, ProductGroupListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'How-many-times';
}
