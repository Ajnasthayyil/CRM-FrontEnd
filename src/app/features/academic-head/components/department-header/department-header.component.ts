import { Component, OnInit } from '@angular/core';
import { AcademicHeadService } from '../../services/academic-head.service';

@Component({
  selector: 'app-department-header',
  templateUrl: './department-header.component.html',
  styleUrls: ['./department-header.component.scss']
})
export class DepartmentHeaderComponent implements OnInit {
  departmentName: string = '';
  role: string = '';

  constructor(private academicHeadService: AcademicHeadService) {}

  ngOnInit(): void {
    const user = this.academicHeadService.getCurrentUser();
    this.departmentName = user.departmentName;
    this.role = 'Academic Head';
  }
}
