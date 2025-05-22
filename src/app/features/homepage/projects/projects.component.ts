import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { SwiperService } from '../../../services/swiper.service';

@Component({
  selector: 'app-projects',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  slides = new Array(9); // Example slide list
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    private elementRef: ElementRef,
    private swiperService: SwiperService
  ) {}

  ngAfterViewInit() {
    // Add a small delay to ensure DOM is ready
    setTimeout(() => this.initializeSwiper(), 100);

    // Add resize observer to reinitialize on window resize
    this.setupResizeObserver();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = null;
    }
  }

  private setupResizeObserver() {
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        // Reinitialize swiper on resize with a debounce
        this.initializeSwiper();
      });

      const container =
        this.elementRef.nativeElement.querySelector('.mySwiper');
      if (container) {
        this.resizeObserver.observe(container);
      }
    }
  }

  private initializeSwiper() {
    const swiperEl =
      this.elementRef.nativeElement.querySelector('swiper-container');

    if (!swiperEl) return;

    // Configure Swiper parameters
    const params = {
      slidesPerView: 'auto',
      spaceBetween: 30,
      navigation: true,
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1440: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
      injectStyles: [
        `
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }
        `,
      ],
    };

    // Initialize Swiper using the service with a small delay
    this.swiperService.initializeSwiper(swiperEl, params, 50);
  }
}
