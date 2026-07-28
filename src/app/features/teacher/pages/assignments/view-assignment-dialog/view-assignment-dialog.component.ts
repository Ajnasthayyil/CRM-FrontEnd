import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Assignment, AssignmentSubmission } from '../../../models/assignment.model';
import { AssignmentService } from '../../../services/assignment.service';

@Component({
  selector: 'app-view-assignment-dialog',
  templateUrl: './view-assignment-dialog.component.html',
  styleUrls: ['./view-assignment-dialog.component.scss']
})
export class ViewAssignmentDialogComponent implements OnInit {
  submissions: AssignmentSubmission[] = [];
  isLoading = true;

  constructor(
    public dialogRef: MatDialogRef<ViewAssignmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Assignment,
    private assignmentService: AssignmentService
  ) {}

  ngOnInit(): void {
    this.assignmentService.getSubmissions(this.data.id).subscribe(subs => {
      this.submissions = subs;
      this.isLoading = false;
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  get submittedSubmissions(): AssignmentSubmission[] {
    return this.submissions.filter(s => s.status !== 'Pending');
  }

  get pendingSubmissions(): AssignmentSubmission[] {
    return this.submissions.filter(s => s.status === 'Pending');
  }
}
