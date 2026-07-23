import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.scss']
})
export class RoleDashboardComponent implements OnInit {
  currentRole: string | null = null;
  dateStr: string = 'Wednesday, 23 July 2024';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentRole$.subscribe(role => {
      this.currentRole = role;
    });
  }
}
