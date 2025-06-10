import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { register } from 'swiper/element/bundle';
import { SwiperContainer } from 'swiper/element';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';

// Register Swiper custom elements
register();

interface Testimonial {
  image: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule, TranslateModule, HeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  testimonials: Testimonial[] = Array(8).fill({
    image: 'assets/person.jpg',
  });

  isLoading = false;
  private languageSubscription: Subscription | null = null;
  private isBrowser: boolean;

  constructor(
    public languageService: LanguageService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Subscribe to RTL changes
    this.languageSubscription = this.languageService.isRTL$.subscribe(() => {
      this.reloadComponent();
    });
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  private reloadComponent() {
    if (!this.isBrowser) return;

    // Show loading state
    this.isLoading = true;

    // Remove Swiper instance
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      swiperEl.innerHTML = '';
    }

    // Reinitialize after a short delay
    setTimeout(() => {
      this.initializeSwiper();
      this.isLoading = false;
    }, 300);
  }

  private initializeSwiper() {
    if (!this.isBrowser) return;

    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      const swiperContainer = swiperEl as SwiperContainer;

      // Set Swiper parameters
      Object.assign(swiperContainer, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        speed: 300,
        watchSlidesProgress: true,
        preventInteractionOnTransition: true,
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
        },
      });

      // Initialize Swiper
      swiperContainer.initialize();
    }
  }
}
