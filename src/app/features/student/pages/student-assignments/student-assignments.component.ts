import { Component, OnInit } from '@angular/core';

interface Assignment {
  id: number;
  title: string;
  subject: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded' | 'late';
  grade?: string;
  description: string;
}

@Component({
  selector: 'app-student-assignments',
  templateUrl: './student-assignments.component.html',
  styleUrls: ['./student-assignments.component.scss']
})
export class StudentAssignmentsComponent implements OnInit {
  assignments: Assignment[] = [];
  
  pendingCount = 0;
  submittedCount = 0;
  gradedCount = 0;

  ngOnInit() {
    this.loadMockAssignments();
  }

  loadMockAssignments() {
    const today = new Date();
    
    this.assignments = [
      {
        id: 1,
        title: 'Algebra Variables Worksheet',
        subject: 'Mathematics',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
        status: 'pending',
        description: 'Complete all 20 problems on the provided worksheet.'
      },
      {
        id: 2,
        title: 'Cell Structure Essay',
        subject: 'Biology',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
        status: 'pending',
        description: 'Write a 1000-word essay on the function of mitochondria.'
      },
      {
        id: 3,
        title: 'World War II Timeline',
        subject: 'History',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
        status: 'late',
        description: 'Create a comprehensive timeline of major events.'
      },
      {
        id: 4,
        title: 'Newton\'s Laws Experiment',
        subject: 'Physics',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3),
        status: 'submitted',
        description: 'Lab report from Tuesday\'s experiment.'
      },
      {
        id: 5,
        title: 'Hamlet Act 1 Analysis',
        subject: 'English Literature',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10),
        status: 'graded',
        grade: 'A',
        description: 'Character analysis of Hamlet.'
      },
      {
        id: 6,
        title: 'Chemical Bonding Quiz',
        subject: 'Chemistry',
        dueDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 14),
        status: 'graded',
        grade: 'B+',
        description: 'Online multiple choice quiz.'
      }
    ];

    this.pendingCount = this.assignments.filter(a => a.status === 'pending' || a.status === 'late').length;
    this.submittedCount = this.assignments.filter(a => a.status === 'submitted').length;
    this.gradedCount = this.assignments.filter(a => a.status === 'graded').length;
  }
}
