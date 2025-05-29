import { Component, OnInit, PLATFORM_ID, Inject, NgZone } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-company-map',
  standalone: true,
  imports: [],
  templateUrl: './company-map.component.html',
  styleUrl: './company-map.component.css',
})
export class CompanyMapComponent implements OnInit {
  private map: any;
  private mapInitialized = false;
  private initialCenter: [number, number] = [29.9723024, 31.2884523];
  private initialZoom: number = 15;
  private marker: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      try {
        await this.initializeMap();
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    }
  }

  resetMapPosition(): void {
    if (this.map) {
      this.map.setView(this.initialCenter, this.initialZoom);
      // Open popup after recentering
      setTimeout(() => {
        if (this.marker) {
          this.marker.openPopup();
        }
      }, 100);
    }
  }

  private async initializeMap(): Promise<void> {
    if (this.mapInitialized) return;

    try {
      // Import Leaflet in a way that works in production
      const L = (await import('leaflet')).default;

      // Ensure the map container exists
      const mapContainer = document.getElementById('map');
      if (!mapContainer) {
        console.error('Map container not found');
        return;
      }

      // Run map initialization inside NgZone
      this.ngZone.runOutsideAngular(() => {
        try {
          // Initialize map
          this.map = new L.Map('map', {
            center: this.initialCenter,
            zoom: this.initialZoom,
            scrollWheelZoom: false,
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            zoomControl: true,
          });

          // Add tile layer
          L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(this.map);

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
            popupAnchor: [10, 0],
          });

          // Add marker and store reference
          this.marker = L.marker(this.initialCenter, { icon: customIcon })
            .addTo(this.map)
            .bindPopup(
              `
              <div style="
                padding: 8px 12px;
                font-family: Arial, sans-serif;
                min-width: 150px;
                text-align: center;
              ">
                <h3 style="
                  margin: 0;
                  font-size: 16px;
                  font-weight: bold;
                  color: #333;
                ">ARA Lighting W.L.L</h3>
              </div>
            `,
              {
                className: 'custom-popup',
                closeButton: true,
                offset: [0, -5],
                maxWidth: 200,
              }
            );

          this.marker.openPopup();

          // Add recenter button
          const RecenterControl = L.Control.extend({
            options: {
              position: 'bottomright',
            },
            onAdd: () => {
              const div = L.DomUtil.create(
                'div',
                'leaflet-bar leaflet-control'
              );
              div.innerHTML = `
                <a href="#" title="Recenter map" style="
                  width: 30px;
                  height: 30px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  text-decoration: none;
                  color: black;
                  background: white;
                  border-radius: 4px;
                  box-shadow: 0 1px 5px rgba(0,0,0,0.65);
                  z-index: 1000;
                ">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3A8.994 8.994 0 0 0 13 3.06V1h-2v2.06A8.994 8.994 0 0 0 3.06 11H1v2h2.06A8.994 8.994 0 0 0 11 20.94V23h2v-2.06A8.994 8.994 0 0 0 20.94 13H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                  </svg>
                </a>
              `;
              div.onclick = (e) => {
                e.preventDefault();
                this.resetMapPosition();
              };
              return div;
            },
          });

          new RecenterControl().addTo(this.map);

          // Add custom CSS for popup
          const style = document.createElement('style');
          style.textContent = `
            .custom-popup .leaflet-popup-content-wrapper {
              background: white;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .custom-popup .leaflet-popup-tip {
              background: white;
            }
            .custom-popup .leaflet-popup-close-button {
              color: #666;
              font-size: 18px;
              padding: 4px 8px;
            }
            .custom-popup .leaflet-popup-close-button:hover {
              color: #333;
            }
          `;
          document.head.appendChild(style);

          // Force a resize after initialization
          setTimeout(() => {
            if (this.map) {
              this.map.invalidateSize();
            }
          }, 100);

          this.mapInitialized = true;
        } catch (error) {
          console.error('Map initialization error:', error);
          throw error;
        }
      });
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
      this.marker = null;
    }
  }
}
