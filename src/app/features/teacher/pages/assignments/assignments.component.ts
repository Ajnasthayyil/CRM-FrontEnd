import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Assignment } from '../../models/assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDialogComponent } from './assignment-dialog/assignment-dialog.component';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  displayedColumns: string[] = ['title', 'class', 'dueDate', 'totalMarks', 'status', 'actions'];
  dataSource: MatTableDataSource<Assignment> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private assignmentService: AssignmentService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.isLoading = true;
    this.assignmentService.getAssignments().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addAssignment() {
    const dialogRef = this.dialog.open(AssignmentDialogComponent, { width: '500px' });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignmentService.addAssignment(result as Assignment).subscribe(newAssignment => {
          if (newAssignment) {
            this.dataSource.data.push(newAssignment);
            this.dataSource._updateChangeSubscription();
          }
        });
      }
    });
  }

  editAssignment(assignment: Assignment) {
    const dialogRef = this.dialog.open(AssignmentDialogComponent, {
      width: '500px',
      data: assignment
    });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignmentService.updateAssignment(assignment.id, result).subscribe(updated => {
          if (updated) {
            const index = this.dataSource.data.findIndex(a => a.id === assignment.id);
            if (index !== -1) {
              this.dataSource.data[index] = updated;
              this.dataSource._updateChangeSubscription();
            }
          }
        });
      }
    });
  }

  deleteAssignment(assignment: Assignment) {
    if (confirm(`Are you sure you want to delete '${assignment.title}'?`)) {
      this.assignmentService.deleteAssignment(assignment.id).subscribe(success => {
        if (success) {
          const index = this.dataSource.data.findIndex(a => a.id === assignment.id);
          if (index !== -1) {
            this.dataSource.data.splice(index, 1);
            this.dataSource._updateChangeSubscription();
          }
        }
      });
    }
  }
}
