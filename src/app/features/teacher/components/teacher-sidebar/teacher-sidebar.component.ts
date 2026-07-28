import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-sidebar',
  templateUrl: './teacher-sidebar.component.html',
  styleUrls: ['./teacher-sidebar.component.scss']
})
export class TeacherSidebarComponent {
  @Input() isOpen = true;

  menuItems: any[] = [
    { title: 'Dashboard', icon: 'dashboard', route: '/teacher/dashboard' },
    { title: 'Students Management', icon: 'people', route: '/teacher/students' },
    { title: 'Assignments', icon: 'assignment', route: '/teacher/assignments' },
    { title: 'Classes and Sessions', icon: 'class', route: '/teacher/classes' },
    { title: 'Attendance', icon: 'fact_check', route: '/teacher/attendance' },
    { title: 'Performance', icon: 'trending_up', route: '/teacher/performance' },
    { title: 'Calendar', icon: 'calendar_today', route: '/teacher/calendar' },
    { title: 'Announcements', icon: 'announcement', route: '/teacher/announcements' },
    { title: 'Study Materials', icon: 'menu_book', route: '/teacher/materials' },
    { title: 'Reports', icon: 'bar_chart', route: '/teacher/reports' },
    { title: 'Profile', icon: 'person', route: '/teacher/profile' }
  ];

  activeMenu: string | null = null;

  constructor(public router: Router) {}

  toggleMenu(menuTitle: string) {
    if (this.activeMenu === menuTitle) {
      this.activeMenu = null;
    } else {
      this.activeMenu = menuTitle;
    }
  }

  isRouteActive(route: string): boolean {
    return this.router.isActive(route, false);
  }
}
