import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<Theme>('light');
  public currentTheme$ = this.currentThemeSubject.asObservable();

  constructor() {
    this.initTheme();
  }

  private initTheme() {
    const savedTheme = localStorage.getItem('app-theme') as Theme;
    if (savedTheme) {
      this.setTheme(savedTheme);
    } else {
      // Default to light for Finpay style
      this.setTheme('light');
    }
  }

  setTheme(theme: Theme) {
    this.currentThemeSubject.next(theme);
    localStorage.setItem('app-theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  toggleTheme() {
    const nextTheme = this.currentThemeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(nextTheme);
  }
}
