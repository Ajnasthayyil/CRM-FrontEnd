import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  role$ = this.authService.currentRole$;
  userName: string = '';
  userInitials: string = '';
  showDropdown = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentRole$.subscribe(role => {
      if (role) {
        if (role === 'Bank Admin' || role === 'Branch Manager') {
          this.userName = 'Sanjay Gupta';
          this.userInitials = 'SG';
        } else if (role === 'Super Admin') {
          this.userName = 'System';
          this.userInitials = 'SA';
        } else {
          this.userName = role;
          this.userInitials = role.charAt(0);
        }
      }
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
