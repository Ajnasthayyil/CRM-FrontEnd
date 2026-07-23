import { Component } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent {
  theme$ = this.themeService.currentTheme$;

  constructor(private themeService: ThemeService) {}

  toggle() {
    this.themeService.toggleTheme();
  }
}
