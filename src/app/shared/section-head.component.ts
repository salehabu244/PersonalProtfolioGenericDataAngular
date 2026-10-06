import { Component, input, booleanAttribute } from '@angular/core';
import { RevealDirective } from './reveal.directive';

/** Consistent heading block used at the top of every section. */
@Component({
  selector: 'app-section-head',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <header class="section-head" [class.section-head--center]="center()" appReveal>
      <p class="eyebrow">{{ eyebrow() }}</p>
      <h2 class="section-title" id="{{ headingId() }}">{{ title() }}</h2>
      @if (lead()) {
        <p class="section-lead">{{ lead() }}</p>
      }
    </header>
  `,
})
export class SectionHeadComponent {
  readonly eyebrow = input.required<string>();
  readonly title = input.required<string>();
  readonly lead = input<string>('');
  readonly center = input(false, { transform: booleanAttribute });
  readonly headingId = input('');
}
