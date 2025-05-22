import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  ElementRef,
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
export class ProjectsComponent implements AfterViewInit {
  slides = new Array(9); // Example slide list

  constructor(
    private elementRef: ElementRef,
    private swiperService: SwiperService
  ) {}

  ngAfterViewInit() {
    const swiperEl =
      this.elementRef.nativeElement.querySelector('swiper-container');

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
    };

    // Initialize Swiper using the service
    this.swiperService.initializeSwiper(swiperEl, params);
  }
}
