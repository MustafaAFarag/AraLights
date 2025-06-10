import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-marquee',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './marquee.component.html',
  styleUrls: ['./marquee.component.css'],
})
export class MarqueeComponent {
  constructor(public languageService: LanguageService) {}
}
