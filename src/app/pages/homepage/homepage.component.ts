import { Component } from '@angular/core';
import { HeroComponent } from '../../features/homepage/hero/hero.component';
import { AboutUsComponent } from '../../features/homepage/about-us/about-us.component';
import { OurServicesComponent } from '../../features/homepage/our-services/our-services.component';
import { MarqueeComponent } from '../../features/homepage/marquee/marquee.component';
import { ProjectsComponent } from '../../features/homepage/projects/projects.component';
import { TestimonialsComponent } from '../../features/homepage/testimonials/testimonials.component';
import { CtaComponent } from '../../features/homepage/cta/cta.component';
@Component({
  selector: 'app-homepage',
  imports: [
    HeroComponent,
    AboutUsComponent,
    OurServicesComponent,
    MarqueeComponent,
    ProjectsComponent,
    TestimonialsComponent,
    CtaComponent,
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {}
