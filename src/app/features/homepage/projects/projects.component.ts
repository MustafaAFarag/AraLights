import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../../components/header/header.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-projects',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProjectsComponent {
  slides = new Array(9); // Example slide list
}
