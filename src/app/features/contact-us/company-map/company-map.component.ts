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
        height: 500px;
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
  private mapInitialized = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        await this.initializeMap();
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    }
  }

  private async initializeMap(): Promise<void> {
    if (this.mapInitialized) return;

    try {
      const L = await import('leaflet');

      // Ensure the map container exists
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      // Initialize map with error handling
      try {
        this.map = L.map('map', {
          center: [26.0667, 50.5577], // Bahrain coordinates
          zoom: 15,
          scrollWheelZoom: false,
          dragging: true,
          touchZoom: true,
          doubleClickZoom: true,
          zoomControl: true,
        });

        // Add tile layer with error handling
        try {
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(this.map);
        } catch (tileError) {
          console.error('Failed to add tile layer:', tileError);
        }

        // Create custom marker icon
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="
            background-color: #3388ff;
            width: 25px;
            height: 41px;
            border-radius: 50% 50% 50% 0;
            transform: rotate(-45deg);
            position: relative;
            margin-left: 12px;
            margin-top: 20px;
          ">
            <div style="
              background-color: white;
              width: 11px;
              height: 11px;
              border-radius: 50%;
              position: absolute;
              top: 15px;
              left: 7px;
            "></div>
          </div>`,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });

        // Add marker with error handling
        try {
          L.marker([26.0667, 50.5577], { icon: customIcon })
            .addTo(this.map)
            .bindPopup('Ara Contracting W.L.L')
            .openPopup();
        } catch (markerError) {
          console.error('Failed to add marker:', markerError);
        }

        // Force a resize after initialization
        setTimeout(() => {
          if (this.map) {
            this.map.invalidateSize();
          }
        }, 100);

        this.mapInitialized = true;
      } catch (mapError) {
        console.error('Failed to create map:', mapError);
        throw mapError;
      }
    } catch (error) {
      console.error('Error loading Leaflet:', error);
      throw error;
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
      this.map = null;
      this.mapInitialized = false;
    }
  }
}
