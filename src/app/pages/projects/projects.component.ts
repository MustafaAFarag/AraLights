import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SectionHeaderComponent } from "../../components/section-header/section-header.component";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  imgs = Array(3)

}
