import { Component, signal, inject, HostListener, OnDestroy } from '@angular/core';
import { ThemeService } from '../../core/theme.service';
import { PROFILE, NAV_LINKS } from '../../core/portfolio.data';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnDestroy {
  private readonly themeService = inject(ThemeService);

  readonly profile = PROFILE;
  readonly links = NAV_LINKS;

  /** True once the page has scrolled far enough to solidify the header. */
  readonly scrolled = signal(false);
  readonly menuOpen = signal(false);
  readonly activeSection = signal<string>('');
  readonly isDark = this.themeService.isDark;

  private observer: IntersectionObserver | null = null;

  constructor() {
    this.onScroll();
    this.setupScrollSpy();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 24);
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 900) this.menuOpen.set(false);
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  /** Close the mobile menu when focus or a click lands outside the header. */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.menuOpen()) return;
    const target = event.target as HTMLElement | null;
    if (target && !target.closest('app-navbar')) this.menuOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  /** Highlights the nav link for the section currently in view. */
  private setupScrollSpy(): void {
    if (typeof IntersectionObserver === 'undefined') return;

    this.observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) this.activeSection.set(visible.target.id);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] },
    );

    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el) this.observer.observe(el);
    }
  }
}
