import { Component, OnInit } from '@angular/core';

interface JobPosting {
  id: string;
  title: string;
  department: string;
  applicants: number;
  status: 'Open' | 'Closed';
}

interface Candidate {
  id: string;
  name: string;
  appliedRole: string;
  appliedDate: string;
  stage: 'New' | 'Interviewing' | 'Offered' | 'Rejected';
  rating: number; // 1-5
}

@Component({
  selector: 'app-recruitment-home',
  templateUrl: './recruitment-home.component.html',
  styleUrls: ['./recruitment-home.component.scss']
})
export class RecruitmentHomeComponent implements OnInit {
  
  jobPostings: JobPosting[] = [];
  candidates: Candidate[] = [];

  metrics = {
    openVacancies: 4,
    totalCandidates: 28,
    interviewsScheduled: 5
  };

  ngOnInit(): void {
    this.jobPostings = [
      { id: 'JOB-01', title: 'Senior Science Teacher', department: 'Science', applicants: 12, status: 'Open' },
      { id: 'JOB-02', title: 'School Counselor', department: 'Student Services', applicants: 8, status: 'Open' },
      { id: 'JOB-03', title: 'PE Instructor', department: 'Physical Education', applicants: 5, status: 'Open' },
      { id: 'JOB-04', title: 'Bus Driver', department: 'Transport', applicants: 3, status: 'Open' }
    ];

    this.candidates = [
      { id: 'CAN-101', name: 'Priya Sharma', appliedRole: 'Senior Science Teacher', appliedDate: '22 Jul 2026', stage: 'Interviewing', rating: 4 },
      { id: 'CAN-102', name: 'Rohan Gupta', appliedRole: 'School Counselor', appliedDate: '23 Jul 2026', stage: 'New', rating: 0 },
      { id: 'CAN-103', name: 'Sneha Verma', appliedRole: 'Senior Science Teacher', appliedDate: '20 Jul 2026', stage: 'Offered', rating: 5 },
      { id: 'CAN-104', name: 'Amit Singh', appliedRole: 'PE Instructor', appliedDate: '24 Jul 2026', stage: 'New', rating: 0 },
      { id: 'CAN-105', name: 'Kavita Iyer', appliedRole: 'School Counselor', appliedDate: '18 Jul 2026', stage: 'Rejected', rating: 2 }
    ];
  }

  postJob() {
    alert('Opening form to post a new job vacancy...');
  }

  viewCandidate(id: string) {
    alert(`Viewing profile for candidate ${id}`);
  }
}
