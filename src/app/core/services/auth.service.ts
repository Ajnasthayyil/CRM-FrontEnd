import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentRoleSubject = new BehaviorSubject<string | null>(null);
  public currentRole$ = this.currentRoleSubject.asObservable();

  constructor() {
    // Attempt to load role from local storage on init
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      this.currentRoleSubject.next(storedRole);
    }
  }

  login(role: string): boolean {
    // Mock login logic
    this.currentRoleSubject.next(role);
    localStorage.setItem('userRole', role);
    return true;
  }

  logout() {
    this.currentRoleSubject.next(null);
    localStorage.removeItem('userRole');
  }

  getCurrentRole(): string | null {
    return this.currentRoleSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentRole();
  }
}
