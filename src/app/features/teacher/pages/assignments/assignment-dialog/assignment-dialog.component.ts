import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Assignment } from '../../../models/assignment.model';

@Component({
  selector: 'app-assignment-dialog',
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit Assignment' : 'Create Assignment' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <mat-form-field appearance="outline">
          <mat-label>Title</mat-label>
          <input matInput formControlName="title" required>
        </mat-form-field>
        
        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Class Name (e.g. Class 10)</mat-label>
            <input matInput formControlName="className" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Section (e.g. A)</mat-label>
            <input matInput formControlName="section" required>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Type</mat-label>
            <mat-select formControlName="type">
              <mat-option value="Homework">Homework</mat-option>
              <mat-option value="Classwork">Classwork</mat-option>
              <mat-option value="Project">Project</mat-option>
            </mat-select>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Total Marks</mat-label>
            <input matInput formControlName="totalMarks" type="number" required>
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Due Date</mat-label>
          <input matInput formControlName="dueDate" type="date" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="2"></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Status</mat-label>
          <mat-select formControlName="status">
            <mat-option value="Draft">Draft</mat-option>
            <mat-option value="Published">Published</mat-option>
          </mat-select>
        </mat-form-field>

      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" (click)="save()" [disabled]="form.invalid">Save</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
      min-width: 450px;
      padding-top: 10px;
    }
    .row {
      display: flex;
      gap: 16px;
      mat-form-field { flex: 1; }
    }
    mat-form-field {
      width: 100%;
    }
  `]
})
export class AssignmentDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assignment
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      title: ['', Validators.required],
      className: ['', Validators.required],
      section: ['', Validators.required],
      type: ['Homework', Validators.required],
      totalMarks: [100, Validators.required],
      dueDate: ['', Validators.required],
      description: [''],
      status: ['Published', Validators.required]
    });
  }

  ngOnInit() {
    if (this.isEdit) {
      this.form.patchValue(this.data);
    }
  }

  save() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
