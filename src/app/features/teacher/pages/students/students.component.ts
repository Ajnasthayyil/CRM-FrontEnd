import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditStudentDialogComponent } from './edit-student-dialog/edit-student-dialog.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  displayedColumns: string[] = ['photo', 'studentId', 'studentName', 'class', 'rollNumber', 'attendance', 'performance', 'status', 'actions'];
  dataSource: MatTableDataSource<Student> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  isLoading = true;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.isLoading = true;
    this.studentService.getStudents().subscribe(students => {
      this.dataSource = new MatTableDataSource(students);
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

  viewStudent(student: Student) {
    // Navigate to student details page (to be implemented)
    // this.router.navigate(['/teacher/students', student.studentId]);
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
            // Update the local data source
            const index = this.dataSource.data.findIndex(s => s.studentId === student.studentId);
            if (index !== -1) {
              this.dataSource.data[index] = updated;
              this.dataSource._updateChangeSubscription(); // force table refresh
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
        }
      });
    }
  }
}
