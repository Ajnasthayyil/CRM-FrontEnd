import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcademicHeadService {
  private currentUser = {
    role: 'AcademicHead',
    departmentId: 3,
    departmentName: 'Computer Science'
  };

  getCurrentUser() {
    return this.currentUser;
  }

  getDepartmentId(): number {
    return this.currentUser.departmentId;
  }
}
