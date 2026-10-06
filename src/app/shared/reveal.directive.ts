import { Directive, ElementRef, OnDestroy, AfterViewInit, inject, signal } from '@angular/core';

/**
 * Adds `is-visible` to the host element the first time it scrolls into view.
 * CSS in styles.scss handles the transition via the `[data-reveal]` selector.
 *
 * Usage: <div appReveal style="--reveal-delay: 120ms">…</div>
 */
@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer: IntersectionObserver | null = null;

  /** Exposed so components can check whether the element has already revealed. */
  readonly revealed = signal(false);

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;

    if (typeof IntersectionObserver === 'undefined' || this.prefersReducedMotion()) {
      this.show();
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.show();
            this.observer?.disconnect();
            this.observer = null;
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' },
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.observer = null;
  }

  private show(): void {
    if (this.revealed()) return;
    this.revealed.set(true);
    this.el.nativeElement.classList.add('is-visible');
  }

  private prefersReducedMotion(): boolean {
    return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
