import { Component, inject } from '@angular/core';
import { RevealDirective } from '../../shared/reveal.directive';
import { PROFILE, STATS } from '../../core/portfolio.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly profile = PROFILE;
  readonly stats = STATS;
}
