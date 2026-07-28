import { Component, Output, EventEmitter } from '@angular/core';
import { TeacherAuthService } from '../../services/teacher-auth.service';

@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.scss']
})
export class TeacherHeaderComponent {
  @Output() toggle = new EventEmitter<void>();

  teacher$ = this.authService.currentTeacher$;

  constructor(private authService: TeacherAuthService) {}

  onToggleSidebar() {
    this.toggle.emit();
  }
}
