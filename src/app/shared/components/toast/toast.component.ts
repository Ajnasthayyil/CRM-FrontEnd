import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastService, ToastMessage } from '../../../core/services/toast.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container" *ngIf="message">
      <div class="toast-notification" [ngClass]="message.type || ''">
        <div class="toast-icon">
          <svg *ngIf="message.type === 'success'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <svg *ngIf="message.type === 'error'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
          <svg *ngIf="message.type === 'info'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        </div>
        <span>{{ message.message }}</span>
        <button class="toast-close" (click)="close()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 2rem;
      right: 2rem;
      z-index: 9999;
      animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .toast-notification {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-radius: 12px;
      background: linear-gradient(145deg, rgba(30, 35, 50, 0.9), rgba(11, 13, 18, 0.95));
      backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 1px 1px rgba(255, 255, 255, 0.1);
      color: #e2e8f0;
      font-size: 0.95rem;
      font-weight: 500;
      min-width: 300px;
      font-family: 'Inter', sans-serif;
    }
    .toast-notification.error {
      border-left: 4px solid #ef4444;
      border-color: rgba(239, 68, 68, 0.5) rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) #ef4444;
      svg { color: #ef4444; filter: drop-shadow(0 0 5px rgba(239, 68, 68, 0.5)); }
    }
    .toast-notification.success {
      border-left: 4px solid #10b981;
      border-color: rgba(16, 185, 129, 0.5) rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) #10b981;
      svg { color: #10b981; filter: drop-shadow(0 0 5px rgba(16, 185, 129, 0.5)); }
    }
    .toast-notification.info {
      border-left: 4px solid #3b82f6;
      border-color: rgba(59, 130, 246, 0.5) rgba(255, 255, 255, 0.1) rgba(255, 255, 255, 0.1) #3b82f6;
      svg { color: #3b82f6; filter: drop-shadow(0 0 5px rgba(59, 130, 246, 0.5)); }
    }
    .toast-close {
      margin-left: auto;
      background: none;
      border: none;
      color: #64748b;
      cursor: pointer;
      padding: 0;
      display: flex;
      align-items: center;
      transition: color 0.3s;
      
      &:hover {
        color: #f8fafc;
      }
    }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `]
})
export class ToastComponent implements OnInit, OnDestroy {
  message: ToastMessage | null = null;
  private sub!: Subscription;
  private timeoutId: any;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.sub = this.toastService.toastState$.subscribe((msg: ToastMessage) => {
      this.message = msg;
      
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
      }
      
      this.timeoutId = setTimeout(() => {
        this.message = null;
      }, 4000);
    });
  }

  close() {
    this.message = null;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}
