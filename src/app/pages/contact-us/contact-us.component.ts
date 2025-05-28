import { Component } from '@angular/core';
import { SectionHeaderComponent } from '../../components/section-header/section-header.component';
import { FormComponent } from '../../features/contact-us/form/form.component';
import { CtaComponent } from '../../features/homepage/cta/cta.component';

@Component({
  selector: 'app-contact-us',
  imports: [SectionHeaderComponent, FormComponent, CtaComponent],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
})
export class ContactUsComponent {}
