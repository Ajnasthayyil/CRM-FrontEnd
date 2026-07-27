import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { PerformanceService } from '../../services/performance.service';
import { Teacher } from '../../models/teacher.model';
import { PerformanceReview } from '../../models/performance.model';

@Component({
  selector: 'app-add-performance',
  templateUrl: './add-performance.component.html',
  styleUrls: ['./add-performance.component.scss']
})
export class AddPerformanceComponent implements OnInit {
  performanceForm: FormGroup;
  teachers: Teacher[] = [];
  today: string = new Date().toISOString().split('T')[0];

  categories = [
    { name: 'Teaching Quality', control: 'teachingQuality' },
    { name: 'Subject Knowledge', control: 'subjectKnowledge' },
    { name: 'Communication', control: 'communication' },
    { name: 'Classroom Mgmt', control: 'classroomManagement' },
    { name: 'Student Engagement', control: 'studentEngagement' },
    { name: 'Lesson Planning', control: 'lessonPlanning' },
    { name: 'Attendance/Punctuality', control: 'attendanceAndPunctuality' },
    { name: 'Discipline', control: 'discipline' },
    { name: 'Professionalism', control: 'professionalism' }
  ];

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private performanceService: PerformanceService,
    private router: Router
  ) {
    this.performanceForm = this.fb.group({
      teacherId: ['', Validators.required],
      reviewPeriod: ['Monthly', Validators.required],
      teachingQuality: [5, Validators.required],
      subjectKnowledge: [5, Validators.required],
      communication: [5, Validators.required],
      classroomManagement: [5, Validators.required],
      studentEngagement: [5, Validators.required],
      lessonPlanning: [5, Validators.required],
      attendanceAndPunctuality: [5, Validators.required],
      discipline: [5, Validators.required],
      professionalism: [5, Validators.required],
      strengths: ['', Validators.required],
      areasForImprovement: [''],
      academicHeadRemarks: [''],
      recommendations: ['']
    });
  }

  ngOnInit(): void {
    this.teacherService.getTeachers().subscribe(data => this.teachers = data);
  }

  onSubmit() {
    if (this.performanceForm.invalid) return;

    const values = this.performanceForm.value;
    const teacher = this.teachers.find(t => t.id === values.teacherId);
    
    // Calculate overall score (average of the 10 ratings)
    const sum = values.teachingQuality + values.subjectKnowledge + values.communication + 
                values.classroomManagement + values.studentEngagement + values.lessonPlanning + 
                values.attendanceAndPunctuality + values.discipline + values.professionalism;
    const overallScore = sum / 9; // there are 9 numeric fields here

    let status = 'Good';
    if (overallScore >= 4.5) status = 'Excellent';
    else if (overallScore >= 4) status = 'Very Good';
    else if (overallScore >= 3) status = 'Good';
    else if (overallScore >= 2) status = 'Needs Improvement';
    else status = 'Unsatisfactory';

    const review: PerformanceReview = {
      ...values,
      id: '',
      departmentId: 0,
      teacherName: teacher ? teacher.name : '',
      overallScore: overallScore,
      status: status as any,
      reviewedDate: this.today
    };

    this.performanceService.addReview(review).subscribe(() => {
      alert('Performance review added successfully!');
      this.router.navigate(['/academic-head/teacher-performance']);
    });
  }
}
