import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from '../../../models/student.model';

@Component({
  selector: 'app-edit-student-dialog',
  template: `
    <h2 mat-dialog-title>Edit Student: {{ data.studentName }}</h2>
    <mat-dialog-content>
      <form [formGroup]="studentForm" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Email Address</mat-label>
          <input matInput formControlName="email" type="email">
        </mat-form-field>
        
        <mat-form-field appearance="outline">
          <mat-label>Phone Number</mat-label>
          <input matInput formControlName="phone">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Emergency Contact</mat-label>
          <input matInput formControlName="emergencyContact">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Address</mat-label>
          <textarea matInput formControlName="address" rows="3"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Teacher Notes</mat-label>
          <textarea matInput formControlName="notes" rows="4" placeholder="Private notes about the student..."></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="studentForm.invalid">Save Changes</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 400px;
      padding-top: 10px;
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class EditStudentDialogComponent implements OnInit {
  studentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditStudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.studentForm = this.fb.group({
      email: ['', [Validators.email]],
      phone: [''],
      emergencyContact: [''],
      address: [''],
      notes: ['']
    });
  }

  ngOnInit() {
    if (this.data) {
      this.studentForm.patchValue({
        email: this.data.email,
        phone: this.data.phone,
        emergencyContact: this.data.emergencyContact,
        address: this.data.address,
        notes: this.data.notes
      });
    }
  }

  save() {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    }
  }
}
