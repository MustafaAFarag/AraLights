import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-company-map',
  standalone: true,
  imports: [],
  templateUrl: './company-map.component.html',
  styleUrl: './company-map.component.css',
  styles: [
    `
      :host ::ng-deep .leaflet-container {
        height: 400px;
        width: 100%;
        margin-top: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
    `,
  ],
})
export class CompanyMapComponent implements OnInit {
  private map: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      await this.initializeMap();
    }
  }

  private async initializeMap(): Promise<void> {
    try {
      const L = await import('leaflet');

      // Wait for the DOM to be ready
      setTimeout(() => {
        this.map = L.map('map', {
          center: [29.9723024, 31.2884523], // Adwat Information Technology coordinates
          zoom: 6, // Closer zoom to show the building
        });

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        // Add a marker for Adwat Information Technology
        L.marker([29.9723024, 31.2884523])
          .addTo(this.map)
          .bindPopup('Adwat Information Technology')
          .openPopup();
      }, 0);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  }
}
