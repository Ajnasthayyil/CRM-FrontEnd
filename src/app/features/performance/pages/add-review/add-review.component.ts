import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss']
})
export class AddReviewComponent implements OnInit {

  reviewForm: FormGroup;
  
  targetRoles = ['Department Lead', 'Teacher', 'Student'];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  years = [2025, 2026, 2027];
  ratings = [1, 2, 3, 4, 5];

  availableTargets: string[] = [];

  // Mock data mapping for hierarchical selection
  private targetsData: { [key: string]: string[] } = {
    'Department Lead': ['Dr. Vikram Singh', 'Mrs. Shalini Iyer'],
    'Teacher': ['Rahul Patel', 'Sunita Sharma', 'Anita Desai'],
    'Student': ['Aarav Singh', 'Diya Patel', 'Kabir Sharma']
  };

  constructor(private fb: FormBuilder, private router: Router) {
    this.reviewForm = this.fb.group({
      targetRole: ['', Validators.required],
      targetPerson: [{ value: '', disabled: true }, Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      rating: [0, Validators.min(1)],
      feedback: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    // Listen for role changes to populate the specific person dropdown
    this.reviewForm.get('targetRole')?.valueChanges.subscribe(role => {
      if (role) {
        this.availableTargets = this.targetsData[role] || [];
        this.reviewForm.get('targetPerson')?.enable();
        this.reviewForm.get('targetPerson')?.setValue('');
      } else {
        this.availableTargets = [];
        this.reviewForm.get('targetPerson')?.disable();
      }
    });
  }

  setRating(rating: number) {
    this.reviewForm.get('rating')?.setValue(rating);
  }

  onSubmit() {
    if (this.reviewForm.valid) {
      console.log('Review Submitted:', this.reviewForm.value);
      alert('Performance review successfully submitted!');
      this.router.navigate(['/performance']);
    } else {
      Object.keys(this.reviewForm.controls).forEach(key => {
        const control = this.reviewForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  cancel() {
    this.router.navigate(['/performance']);
  }
}
