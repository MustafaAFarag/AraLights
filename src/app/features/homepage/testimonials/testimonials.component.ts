import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { SwiperContainer, SwiperSlide } from 'swiper/element';

interface Testimonial {
  text: string;
  name: string;
  position: string;
  company: string;
  image: string;
}

// Register Swiper custom elements
register();

@Component({
  selector: 'app-testimonials',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TestimonialsComponent {
  testimonials: Testimonial[] = Array(8).fill({
    text: 'ARA Lighting is part of the leading ARA Group, originally founded with American roots. Established in 2020 and headquartered in Bahrain, ARA Lighting is part of the Leading ARA Group, originally founded with American Roots.ARA Lighting is part of the leading ARA Group, originally founded with American roots. Established in 2020 and headquartered in Bahrain, ARA Lighting is part of the Leading ARA Group, originally founded with American Roots.',
    name: 'Randa Ahmed',
    position: 'CEO',
    company: 'Company Name',
    image: 'assets/person.jpg',
  });
}
