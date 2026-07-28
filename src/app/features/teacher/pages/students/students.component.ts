import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditStudentDialogComponent } from './edit-student-dialog/edit-student-dialog.component';
import { ViewDetailsDialogComponent } from '../../../../shared/components/view-details-dialog/view-details-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  pagedStudents: Student[] = [];
  
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  // Sorting
  sortColumn: string = 'studentName';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  isLoading = true;
  Math = Math; // For template

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe(data => {
      this.students = data || [];
      this.applyFilters();
      this.isLoading = false;
    });
  }

  applyFilters() {
    let result = [...this.students];
    
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(s => 
        s.studentName.toLowerCase().includes(q) ||
        s.studentId.toLowerCase().includes(q) ||
        s.className.toLowerCase().includes(q)
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
    
    this.filteredStudents = result;
    this.totalPages = Math.ceil(this.filteredStudents.length / this.itemsPerPage) || 1;
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
    this.pagedStudents = this.filteredStudents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  viewStudent(student: Student) {
    this.dialog.open(ViewDetailsDialogComponent, {
      width: '500px',
      data: {
        title: 'Student Details',
        details: [
          { label: 'Student ID', value: student.studentId },
          { label: 'Name', value: student.studentName },
          { label: 'Class', value: student.className },
          { label: 'Guardian', value: student.guardianName },
          { label: 'Contact', value: student.contact },
          { label: 'Status', value: student.status }
        ]
      }
    });
  }

  editStudent(student: Student) {
    const dialogRef = this.dialog.open(EditStudentDialogComponent, {
      width: '500px',
      data: student
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentService.updateStudent(student.studentId, result).subscribe(updated => {
          if (updated) {
            const index = this.students.findIndex(s => s.studentId === student.studentId);
            if (index !== -1) {
              this.students[index] = updated;
              this.applyFilters();
              this.toastService.success(`Student ${student.studentName} updated successfully`);
            }
          }
        });
      }
    });
  }

  toggleBlock(student: Student) {
    const isBlocked = student.status === 'Blocked';
    const newStatus = !isBlocked;
    
    if (confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} ${student.studentName}?`)) {
      this.studentService.blockStudent(student.studentId, newStatus).subscribe(success => {
        if (success) {
          student.status = newStatus ? 'Blocked' : 'Active';
          this.toastService.success(`Student ${student.studentName} has been ${isBlocked ? 'unblocked' : 'blocked'}.`);
        }
      });
    }
  }
}
