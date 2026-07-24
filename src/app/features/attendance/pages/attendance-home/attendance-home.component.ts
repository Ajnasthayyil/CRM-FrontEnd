import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-home',
  templateUrl: './attendance-home.component.html',
  styleUrls: ['./attendance-home.component.scss']
})
export class AttendanceHomeComponent implements OnInit {
  viewMode: 'List' | 'Calendar' = 'List';
  currentDate: Date = new Date();
  
  // Mock Attendance Data
  attendanceRecords = [
    {
      id: 'EMP001',
      name: 'Sunita Patel',
      department: 'Science',
      date: '2026-07-24',
      checkIn: '08:15 AM',
      checkOut: '04:30 PM',
      workingHours: '8h 15m',
      status: 'Present',
      statusClass: 'status-green'
    },
    {
      id: 'EMP002',
      name: 'Rajeev Kumar',
      department: 'Mathematics',
      date: '2026-07-24',
      checkIn: '08:45 AM',
      checkOut: '05:00 PM',
      workingHours: '8h 15m',
      status: 'Late',
      statusClass: 'status-orange'
    },
    {
      id: 'EMP003',
      name: 'Kavita Rao',
      department: 'Arts',
      date: '2026-07-24',
      checkIn: '-',
      checkOut: '-',
      workingHours: '-',
      status: 'Absent',
      statusClass: 'status-red'
    },
    {
      id: 'EMP004',
      name: 'Vikram Singh',
      department: 'Management',
      date: '2026-07-24',
      checkIn: '08:00 AM',
      checkOut: '06:00 PM',
      workingHours: '10h 0m',
      status: 'Present',
      statusClass: 'status-green'
    },
    {
      id: 'EMP005',
      name: 'Anita Desai',
      department: 'Library',
      date: '2026-07-24',
      checkIn: '-',
      checkOut: '-',
      workingHours: '-',
      status: 'On Leave',
      statusClass: 'status-blue'
    }
  ];

  calendarDays: number[] = [];
  
  constructor() {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    // Generate dummy 31 days for current month view
    this.calendarDays = Array.from({length: 31}, (_, i) => i + 1);
  }

  setViewMode(mode: 'List' | 'Calendar') {
    this.viewMode = mode;
  }
  
  getAttendanceStatusForDay(day: number): string {
    // Mock logic for calendar view colors
    if (day === 5 || day === 12 || day === 19 || day === 26) return 'weekend'; // Weekends
    if (day === 15) return 'holiday'; // Public Holiday
    if (day % 7 === 0) return 'absent'; // Random absent
    if (day % 5 === 0) return 'late'; // Random late
    if (day > this.currentDate.getDate()) return 'future'; // Future days
    return 'present';
  }
}
