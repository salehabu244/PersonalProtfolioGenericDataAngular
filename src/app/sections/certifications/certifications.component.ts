import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadComponent } from '../../shared/section-head.component';
import { CERTIFICATIONS } from '../../core/portfolio.data';

@Component({
  selector: 'app-certifications',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './certifications.component.html',
  styleUrl: './certifications.component.scss',
})
export class CertificationsComponent {
  readonly certifications = CERTIFICATIONS;
}
