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
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    const savedLanguage = this.getStoredLanguage() || this.DEFAULT_LANGUAGE;
    this.setLanguage(savedLanguage);
  }

  private getStoredLanguage(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.LANGUAGE_KEY);
    }
    return null;
  }

  private setStoredLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.LANGUAGE_KEY, lang);
    }
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
    this.setStoredLanguage(lang);

    // Set RTL based on language
    const isRTL = lang === 'ar';
    this.isRTL.next(isRTL);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
    }
  }

  getCurrentLanguage(): string {
    return this.translate.currentLang;
  }
}
