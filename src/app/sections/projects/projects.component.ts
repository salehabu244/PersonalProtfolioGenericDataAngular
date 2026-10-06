import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadComponent } from '../../shared/section-head.component';
import { PROJECTS } from '../../core/portfolio.data';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly projects = PROJECTS;
}
