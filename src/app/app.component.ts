import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseInputFormComponent } from './base-input-form/base-input-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Texter';
  version = 1.1;
}
