import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { SectionHeadComponent } from '../../shared/section-head.component';
import { SKILL_GROUPS } from '../../core/portfolio.data';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective, SectionHeadComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly groups = SKILL_GROUPS;
}
