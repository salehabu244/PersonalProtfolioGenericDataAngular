import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadComponent } from '../../shared/section-head.component';
import { EXPERIENCE } from '../../core/portfolio.data';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly experience = EXPERIENCE;
}
