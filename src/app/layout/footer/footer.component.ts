import { Component } from '@angular/core';
import { PROFILE } from '../../core/portfolio.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly profile = PROFILE;
  readonly year = new Date().getFullYear();
}
