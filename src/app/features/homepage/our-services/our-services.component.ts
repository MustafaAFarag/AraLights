import { Component } from '@angular/core';
import { LucideAngularModule, FileIcon, LucideIconData } from 'lucide-angular';
import { HeaderComponent } from '../../../components/header/header.component';

interface ServiceItem {
  title: string;
  icon: string;
  description?: string;
}

@Component({
  selector: 'app-our-services',
  imports: [LucideAngularModule, HeaderComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.css',
})
export class OurServicesComponent {
  services: ServiceItem[] = [
    {
      title: 'Facade light systems',
      icon: '/assets/facade.png',
      description:
        'Innovative facade lighting systems that enhance architectural features and create stunning visual displays for buildings and structures.',
    },
    {
      title: 'Interior Light',
      icon: '/assets/icon2.png',
      description:
        'Custom interior lighting solutions that combine functionality with aesthetic appeal, creating perfect ambiance for any space.',
    },
    {
      title: 'Landing scape',
      icon: '/assets/icon3.png',
      description:
        'Landscape lighting designs that transform outdoor environments, highlighting natural features and ensuring safety and security.',
    },
    {
      title: 'Aviation light',
      icon: '/assets/aviation.png',
      description:
        'Specialized aviation lighting systems that meet international standards for safety and visibility in airfields and related facilities.',
    },
    {
      title: 'Airport & Helicopter lighting',
      icon: '/assets/icon5.png',
      description:
        'Comprehensive lighting solutions for airports and heliports, including runway, taxiway, and approach lighting systems.',
    },
  ];
}
