import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { register } from 'swiper/element/bundle';
import { SwiperContainer } from 'swiper/element';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';

// Register Swiper custom elements
if (typeof window !== 'undefined') {
  register();
}

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
export class TestimonialsComponent implements OnInit, OnDestroy, AfterViewInit {
  testimonials: Testimonial[] = Array(12).fill({
    image: 'assets/person.jpg',
  });

  isLoading = true;
  private languageSubscription: Subscription | null = null;
  private isBrowser: boolean;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    public languageService: LanguageService,
    @Inject(PLATFORM_ID) platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    // Subscribe to RTL changes
    this.languageSubscription = this.languageService.isRTL$.subscribe(() => {
      if (this.isBrowser) {
        this.reloadComponent();
      }
    });
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      // Initial load with longer timeout to ensure proper initialization
      setTimeout(() => {
        this.reloadComponent();
      }, 500);
    }
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private setupResizeObserver() {
    if (!this.isBrowser) return;

    const swiperEl = document.querySelector('swiper-container');
    if (!swiperEl) return;

    this.resizeObserver = new ResizeObserver(() => {
      const swiperContainer = swiperEl as SwiperContainer;
      if (swiperContainer.swiper) {
        swiperContainer.swiper.update();
      }
    });

    this.resizeObserver.observe(swiperEl);
  }

  private reloadComponent() {
    if (!this.isBrowser) return;

    // Show loading state
    this.isLoading = true;
    this.cdr.detectChanges();

    // Remove Swiper instance
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl) {
      swiperEl.innerHTML = '';
    }

    // Reinitialize after a short delay
    setTimeout(() => {
      this.initializeSwiper();
      this.setupResizeObserver();
      this.isLoading = false;
      this.cdr.detectChanges();

      // Force update after a delay to ensure proper slide count
      setTimeout(() => {
        const swiperContainer = swiperEl as SwiperContainer;
        if (swiperContainer.swiper) {
          swiperContainer.swiper.update();
          // Force resize to trigger breakpoint update
          window.dispatchEvent(new Event('resize'));
        }
      }, 100);
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
        observer: true,
        observeParents: true,
        slidesPerGroup: 1,
        breakpoints: {
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
            slidesPerGroup: 2,
          },
          1280: {
            slidesPerView: 3,
            spaceBetween: 20,
            slidesPerGroup: 3,
          },
        },
      });

      // Initialize Swiper
      swiperContainer.initialize();

      // Force update after initialization
      setTimeout(() => {
        if (swiperContainer.swiper) {
          swiperContainer.swiper.update();
        }
      }, 0);
    }
  }
}
