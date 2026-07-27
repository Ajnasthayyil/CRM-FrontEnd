import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';

@Component({
  selector: 'app-teacher-details',
  templateUrl: './teacher-details.component.html',
  styleUrls: ['./teacher-details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  teacher: Teacher | undefined;
  activeTab = 'Personal';

  constructor(
    private route: ActivatedRoute,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.teacherService.getTeacherById(id).subscribe(data => {
        if (data) {
          this.teacher = {
            ...data,
            initials: data.name.split(' ').map((n:any) => n[0]).join('').substring(0,2),
            avatarColor: 'purple'
          } as any;
        }
      });
    }
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
