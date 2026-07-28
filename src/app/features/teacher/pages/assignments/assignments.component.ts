import { Component, OnInit } from '@angular/core';
import { Assignment } from '../../models/assignment.model';
import { AssignmentService } from '../../services/assignment.service';
import { MatDialog } from '@angular/material/dialog';
import { AssignmentDialogComponent } from './assignment-dialog/assignment-dialog.component';
import { ViewAssignmentDialogComponent } from './view-assignment-dialog/view-assignment-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.scss']
})
export class AssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  filteredAssignments: Assignment[] = [];
  pagedAssignments: Assignment[] = [];
  
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  // Sorting
  sortColumn: string = 'dueDate';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  isLoading = true;
  Math = Math;

  constructor(
    private assignmentService: AssignmentService,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  loadAssignments(): void {
    this.isLoading = true;
    this.assignmentService.getAssignments().subscribe(data => {
      this.assignments = data || [];
      this.applyFilters();
      this.isLoading = false;
    });
  }

  applyFilters() {
    let result = [...this.assignments];
    
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(a => 
        a.title.toLowerCase().includes(q) ||
        a.className.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q)
      );
    }
    
    // Sort
    result.sort((a: any, b: any) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.filteredAssignments = result;
    this.totalPages = Math.ceil(this.filteredAssignments.length / this.itemsPerPage) || 1;
    this.setPage(1);
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.pagedAssignments = this.filteredAssignments.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  addAssignment() {
    const dialogRef = this.dialog.open(AssignmentDialogComponent, { width: '500px' });
    
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.assignmentService.addAssignment(result as Assignment).subscribe(newAssignment => {
          if (newAssignment) {
            this.assignments.push(newAssignment);
            this.applyFilters();
            this.toastService.success(`Assignment '${newAssignment.title}' created successfully.`);
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
            const index = this.assignments.findIndex(a => a.id === assignment.id);
            if (index !== -1) {
              this.assignments[index] = updated;
              this.applyFilters();
              this.toastService.success(`Assignment '${updated.title}' updated successfully.`);
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
          const index = this.assignments.findIndex(a => a.id === assignment.id);
          if (index !== -1) {
            this.assignments.splice(index, 1);
            this.applyFilters();
            this.toastService.success(`Assignment '${assignment.title}' deleted successfully.`);
          }
        }
      });
    }
  }

  viewAssignment(assignment: Assignment) {
    this.dialog.open(ViewAssignmentDialogComponent, {
      width: '800px',
      data: assignment
    });
  }
}
