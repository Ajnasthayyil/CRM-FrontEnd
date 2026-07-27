import { Component, OnInit } from '@angular/core';

interface TrainingProgram {
  id: string;
  title: string;
  category: string;
  enrolled: number;
  status: 'Active' | 'Upcoming' | 'Completed';
}

interface Enrollment {
  id: string;
  employeeName: string;
  role: string;
  courseTitle: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Not Started';
}

@Component({
  selector: 'app-training-home',
  templateUrl: './training-home.component.html',
  styleUrls: ['./training-home.component.scss']
})
export class TrainingHomeComponent implements OnInit {

  programs: TrainingProgram[] = [];
  enrollments: Enrollment[] = [];

  metrics = {
    activePrograms: 3,
    staffEnrolled: 42,
    certifications: 15
  };

  ngOnInit(): void {
    this.programs = [
      { id: 'TRN-01', title: 'Advanced Pedagogy', category: 'Teaching', enrolled: 15, status: 'Active' },
      { id: 'TRN-02', title: 'First Aid & CPR', category: 'Safety', enrolled: 20, status: 'Upcoming' },
      { id: 'TRN-03', title: 'Tech Tools for Classroom', category: 'Technology', enrolled: 12, status: 'Active' }
    ];

    this.enrollments = [
      { id: 'ENR-001', employeeName: 'Rahul Patel', role: 'Senior Science Teacher', courseTitle: 'Advanced Pedagogy', progress: 75, status: 'In Progress' },
      { id: 'ENR-002', employeeName: 'Anita Desai', role: 'Librarian', courseTitle: 'Tech Tools for Classroom', progress: 100, status: 'Completed' },
      { id: 'ENR-003', employeeName: 'Sunita Sharma', role: 'Math Teacher', courseTitle: 'Advanced Pedagogy', progress: 0, status: 'Not Started' },
      { id: 'ENR-004', employeeName: 'Dr. Vikram Singh', role: 'Principal', courseTitle: 'First Aid & CPR', progress: 50, status: 'In Progress' }
    ];
  }

  scheduleTraining() {
    alert('Opening form to schedule a new training program...');
  }

  viewCourse(id: string) {
    alert(`Viewing course details for ${id}`);
  }
}
