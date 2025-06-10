import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  OnInit,
} from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TranslateModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy, OnInit {
  slides = new Array(9); // Example slide list
  activeIndex = 0;
  items = [
    'homepage.projects.filters.all',
    'homepage.projects.filters.facade',
    'homepage.projects.filters.interior',
    'homepage.projects.filters.landscape',
    'homepage.projects.filters.aviation',
  ];
  private flickityInstance: any;

  @ViewChild('flickityContainer', { static: false })
  flickityContainer!: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public languageService: LanguageService
  ) {}

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
                wrapAround: false,
                pageDots: false,
                prevNextButtons: true,
                draggable: true,
                cellSelector: '.carousel-cell',
              }
            );

            // Handle button visibility and drag behavior
            this.flickityInstance.on('select', () => {
              const isFirst = this.flickityInstance.selectedIndex === 0;
              const isLast =
                this.flickityInstance.selectedIndex ===
                this.flickityInstance.slides.length - 1;

              // Disable/enable previous button
              const prevButton =
                this.flickityContainer.nativeElement.querySelector(
                  '.flickity-prev-next-button.previous'
                );
              if (prevButton) {
                prevButton.style.display = isFirst ? 'none' : 'block';
              }

              // Disable/enable next button
              const nextButton =
                this.flickityContainer.nativeElement.querySelector(
                  '.flickity-prev-next-button.next'
                );
              if (nextButton) {
                nextButton.style.display = isLast ? 'none' : 'block';
              }
            });

            // Initial button state
            this.flickityInstance.select(0);

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

  ngOnInit() {
    // Initialize Flickity here if needed
  }
}
