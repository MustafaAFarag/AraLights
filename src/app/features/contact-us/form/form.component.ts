import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  imports: [ButtonComponent, TranslateModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {}
