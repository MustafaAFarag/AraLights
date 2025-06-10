import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

interface ServiceItem {
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TranslateModule],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css',
})
export class OurServicesComponent {
  services: ServiceItem[] = [
    {
      title: 'homepage.ourServices.services.facadeLight.title',
      icon: '/assets/facade.png',
      description: 'homepage.ourServices.services.facadeLight.description',
    },
    {
      title: 'homepage.ourServices.services.interiorLight.title',
      icon: '/assets/icon2.png',
      description: 'homepage.ourServices.services.interiorLight.description',
    },
    {
      title: 'homepage.ourServices.services.landscape.title',
      icon: '/assets/icon3.png',
      description: 'homepage.ourServices.services.landscape.description',
    },
    {
      title: 'homepage.ourServices.services.aviationLight.title',
      icon: '/assets/aviation.png',
      description: 'homepage.ourServices.services.aviationLight.description',
    },
    {
      title: 'homepage.ourServices.services.airportLight.title',
      icon: '/assets/icon5.png',
      description: 'homepage.ourServices.services.airportLight.description',
    },
  ];

  constructor(public languageService: LanguageService) {}
}
