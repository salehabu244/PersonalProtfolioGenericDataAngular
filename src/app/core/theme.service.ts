import { Injectable, signal, computed, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'portfolio-theme';

/**
 * Persists the user's light/dark choice and keeps `data-theme` in sync on <html>.
 * The initial value is applied by an inline script in index.html so there is no
 * flash of the wrong theme before Angular bootstraps.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);

  /** Current theme. Defaults to the value already on <html> (set by index.html). */
  readonly theme = signal<Theme>(this.readInitialTheme());

  /** True when the active theme is dark. */
  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    effect(() => {
      const value = this.theme();
      if (!this.isBrowser) return;
      document.documentElement.setAttribute('data-theme', value);
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* storage unavailable (private mode) — theme still applies for this session */
      }
    });
  }

  /** Switch between light and dark. */
  toggle(): void {
    this.theme.set(this.isDark() ? 'light' : 'dark');
  }

  /** Switch to an explicit theme. */
  set(theme: Theme): void {
    this.theme.set(theme);
  }

  private readInitialTheme(): Theme {
    if (!this.isBrowser) return 'light';
    const attr = document.documentElement.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
}
