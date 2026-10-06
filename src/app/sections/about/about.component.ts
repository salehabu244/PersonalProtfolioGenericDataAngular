import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadComponent } from '../../shared/section-head.component';
import { ABOUT, PROFILE } from '../../core/portfolio.data';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly about = ABOUT;
  readonly profile = PROFILE;
}
