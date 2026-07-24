import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {
  isEditMode: boolean = false;
  employeeId: string | null = null;
  
  currentStep: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.isEditMode = true;
        this.employeeId = params.get('id');
        this.loadEmployeeData();
      }
    });
  }
  
  loadEmployeeData() {
    // Logic to load existing employee data for edit mode
  }

  setStep(step: number) {
    // Optionally add validation before allowing step jump
    this.currentStep = step;
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  saveEmployee() {
    // Logic to save the employee data
    console.log('Employee Saved');
    this.router.navigate(['/employees/all']);
  }
}
