import { Component, OnInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.scss']
})
export class OtpVerificationComponent implements OnInit {
  selectedRole: string = 'User';
  otpCode: string[] = ['', '', '', '', '', ''];
  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['role']) {
        this.selectedRole = params['role'];
      } else {
        // If no role, go back to home
        this.router.navigate(['/']);
      }
    });
  }

  onInput(event: any, index: number) {
    const value = event.target.value;
    if (value && index < 5) {
      // Move to next input
      this.otpInputs.toArray()[index + 1].nativeElement.focus();
    }
  }

  onKeyDown(event: KeyboardEvent, index: number) {
    if (event.key === 'Backspace' && !this.otpCode[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      this.otpInputs.toArray()[index - 1].nativeElement.focus();
    }
  }

  verify() {
    const fullCode = this.otpCode.join('');
    if (fullCode.length === 6) {
      this.authService.login(this.selectedRole);
      this.router.navigate(['/dashboard']);
    } else {
      alert("Please enter all 6 digits.");
    }
  }
}
