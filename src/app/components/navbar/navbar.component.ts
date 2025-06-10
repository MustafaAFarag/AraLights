import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  isSidebarOpen = false;

  constructor(public languageService: LanguageService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  switchLang() {
    const currentLang = this.languageService.getCurrentLanguage();
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    this.languageService.setLanguage(newLang);
  }
}
