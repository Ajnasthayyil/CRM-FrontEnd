import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {
  constructor(private router: Router) {}

  selectRole(roleName: string) {
    this.router.navigate(['/login'], { queryParams: { role: roleName } });
  }
}
