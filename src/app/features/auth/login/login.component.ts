import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  selectedRole: string = 'Super Admin';
  roles: string[] = ['Super Admin', 'Admin', 'Manager', 'Teacher', 'Student', 'Parent', 'Staff'];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.selectedRole = params['role'];
      }
    });
  }

  onRoleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedRole = selectElement.value;
  }

  onLogin(event: Event) {
    event.preventDefault();
    // Navigate to OTP verification instead of directly logging in
    this.router.navigate(['/verify-otp'], { queryParams: { role: this.selectedRole } });
  }
}
