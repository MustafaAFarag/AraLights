import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SwiperService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Initialize a Swiper element with the given parameters
   * @param swiperEl The Swiper element to initialize
   * @param params Configuration parameters for Swiper
   * @returns boolean indicating if initialization was successful
   */
  initializeSwiper(swiperEl: Element | null, params: any): boolean {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId) || !swiperEl) {
      return false;
    }

    // Assign parameters to Swiper element
    Object.assign(swiperEl, params);

    // Initialize Swiper
    // @ts-ignore - Swiper element has initialize method
    swiperEl.initialize();
    return true;
  }
}
