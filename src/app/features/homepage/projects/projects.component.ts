import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  slides = new Array(9); // Example slide list
  private flickityInstance: any;

  @ViewChild('flickityContainer', { static: false })
  flickityContainer!: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    // Only initialize Flickity in browser environment
    if (isPlatformBrowser(this.platformId)) {
      try {
        // Dynamically import Flickity only in browser
        const Flickity = (await import('flickity')).default;

        // Use setTimeout to ensure DOM is fully rendered
        setTimeout(() => {
          if (this.flickityContainer && this.flickityContainer.nativeElement) {
            console.log('Initializing Flickity...');
            this.flickityInstance = new Flickity(
              this.flickityContainer.nativeElement,
              {
                wrapAround: true,
                cellAlign: 'center',
                contain: true,
                pageDots: true,
                prevNextButtons: true,
                autoPlay: false,
                draggable: true,
                freeScroll: false,
                groupCells: false,
                adaptiveHeight: true,
                cellSelector: '.carousel-cell',
              }
            );
            console.log('Flickity initialized successfully');
          }
        }, 0);
      } catch (error) {
        console.error('Error initializing Flickity:', error);
      }
    }
  }

  ngOnDestroy() {
    // Clean up Flickity instance when component is destroyed
    if (this.flickityInstance) {
      this.flickityInstance.destroy();
    }
  }
}
