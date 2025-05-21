import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text: string = '';
  @Input() variant: 'primary' | 'secondary' = 'primary';
  @Input() icon: string = '/assets/arrow-right.png';
  @Input() iconAlt: string = 'arrow-right';
}
