import { Component } from '@angular/core';
import { SpinnerComponent } from './components/commons/spinner/spinner.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public customSpinner = SpinnerComponent;

  constructor() {
  }
}
