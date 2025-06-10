import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule, SectionHeaderComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  imgs = Array(3);
  items = [
    'projects.filters.all',
    'projects.filters.facade',
    'projects.filters.interior',
    'projects.filters.landscape',
    'projects.filters.aviation',
  ];
  activeIndex = 0;

  constructor(public languageService: LanguageService) {}
}
