import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
} from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent implements AfterViewInit {
  slides = new Array(9); // Example slide list

  ngAfterViewInit() {
    // Register Swiper custom elements
    const swiperEl = document.querySelector('swiper-container');

    if (swiperEl) {
      // Object with parameters
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
      };

      // Assign it to Swiper element
      Object.assign(swiperEl, params);

      // Initialize Swiper
      // @ts-ignore - Swiper element has initialize method
      swiperEl.initialize();
    }
  }
}
