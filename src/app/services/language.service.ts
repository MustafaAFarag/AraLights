import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly LANGUAGE_KEY = 'preferred_language';
  private readonly DEFAULT_LANGUAGE = 'en';

  private isRTL = new BehaviorSubject<boolean>(false);
  isRTL$ = this.isRTL.asObservable();

  constructor(
    private translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Set default language
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);

    // Initialize with stored language or default
    const savedLanguage = this.getStoredLanguage();
    if (savedLanguage) {
      // First load the translations
      this.translate.getTranslation(savedLanguage).subscribe(() => {
        // Then set the language
        this.translate.use(savedLanguage).subscribe(() => {
          console.log('Language initialized with:', savedLanguage);
          this.setLanguage(savedLanguage);
        });
      });
    } else {
      this.setLanguage(this.DEFAULT_LANGUAGE);
    }
  }

  private getStoredLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem(this.LANGUAGE_KEY);
      console.log('Stored language:', lang);
      return lang;
    }
    return null;
  }

  private setStoredLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.LANGUAGE_KEY, lang);
      console.log('Language stored:', lang);
    }
  }

  setLanguage(lang: string): void {
    console.log('Setting language to:', lang);
    // First load the translations
    this.translate.getTranslation(lang).subscribe(() => {
      // Then set the language
      this.translate.use(lang).subscribe(() => {
        console.log('Language changed to:', lang);
        this.setStoredLanguage(lang);

        // Set RTL based on language
        const isRTL = lang === 'ar';
        this.isRTL.next(isRTL);
        if (isPlatformBrowser(this.platformId)) {
          document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
          document.documentElement.lang = lang;
        }
      });
    });
  }

  getCurrentLanguage(): string {
    const currentLang = this.translate.currentLang || this.DEFAULT_LANGUAGE;
    console.log('Current language:', currentLang);
    return currentLang;
  }
}
