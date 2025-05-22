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
   * @param delay Optional delay in ms before initialization
   * @returns boolean indicating if initialization was successful
   */
  initializeSwiper(
    swiperEl: Element | null,
    params: any,
    delay: number = 0
  ): boolean {
    // Only run in browser environment
    if (!isPlatformBrowser(this.platformId) || !swiperEl) {
      return false;
    }

    const initSwiper = () => {
      // Clean any existing inline attributes that might conflict
      if (swiperEl.hasAttribute('slides-per-view')) {
        swiperEl.removeAttribute('slides-per-view');
      }

      if (swiperEl.hasAttribute('breakpoints')) {
        swiperEl.removeAttribute('breakpoints');
      }

      // Assign parameters to Swiper element
      Object.assign(swiperEl, params);

      // Initialize Swiper
      // @ts-ignore - Swiper element has initialize method
      if (swiperEl.initialize && typeof swiperEl.initialize === 'function') {
        // @ts-ignore
        swiperEl.initialize();
        console.log('Swiper initialized with params:', params);
        return true;
      } else {
        console.error('Swiper element does not have initialize method');
        return false;
      }
    };

    // Use setTimeout to ensure DOM is fully ready and Swiper is registered
    if (delay > 0) {
      setTimeout(() => initSwiper(), delay);
      return true;
    } else {
      return initSwiper();
    }
  }
}
