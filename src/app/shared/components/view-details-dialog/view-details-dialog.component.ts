import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface ViewDetailsData {
  title: string;
  details: { label: string; value: any }[];
}

@Component({
  selector: 'app-view-details-dialog',
  templateUrl: './view-details-dialog.component.html',
  styleUrls: ['./view-details-dialog.component.scss']
})
export class ViewDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ViewDetailsData
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
