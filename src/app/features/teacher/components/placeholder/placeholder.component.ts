import { Component } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  template: `
    <div class="page-container">
      <div class="empty-state">
        <mat-icon>construction</mat-icon>
        <h2>Page Under Construction</h2>
        <p>This module is currently being built and will be available soon.</p>
        <button mat-flat-button color="primary" routerLink="/teacher/dashboard">Back to Dashboard</button>
      </div>
    </div>
  `,
  styles: [`
    .page-container {
      height: calc(100vh - 120px);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .empty-state {
      text-align: center;
      background: white;
      padding: 60px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.03);
      max-width: 400px;
      
      mat-icon {
        font-size: 64px;
        height: 64px;
        width: 64px;
        color: #ffb300;
        margin-bottom: 24px;
      }
      
      h2 { color: #333; margin: 0 0 12px 0; }
      p { color: #666; margin: 0 0 24px 0; }
    }
  `]
})
export class PlaceholderComponent {}
