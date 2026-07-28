import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClassInfo } from '../../../models/class.model';

@Component({
  selector: 'app-class-dialog',
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Edit Class' : 'Create New Class' }}</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Class Name</mat-label>
            <input matInput formControlName="className" placeholder="e.g. Class 10" required>
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Section</mat-label>
            <input matInput formControlName="section" placeholder="e.g. A" required>
          </mat-form-field>
        </div>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Room Number</mat-label>
            <input matInput formControlName="room">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Academic Year</mat-label>
            <input matInput formControlName="academicYear">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Schedule Details</mat-label>
          <input matInput formControlName="schedule" placeholder="e.g. Mon, Wed, Fri">
        </mat-form-field>

        <div class="row">
          <mat-form-field appearance="outline">
            <mat-label>Start Time</mat-label>
            <input matInput formControlName="startTime" type="time">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>End Time</mat-label>
            <input matInput formControlName="endTime" type="time">
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="2"></textarea>
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
export class ClassDialogComponent implements OnInit {
  form: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ClassDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClassInfo
  ) {
    this.isEdit = !!data;
    this.form = this.fb.group({
      className: ['', Validators.required],
      section: ['', Validators.required],
      room: [''],
      academicYear: ['2026-2027'],
      schedule: [''],
      startTime: ['09:00'],
      endTime: ['10:00'],
      description: ['']
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
