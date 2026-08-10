import { Component, OnInit } from '@angular/core';

interface CalendarDay {
  date: number | null;
  status: 'present' | 'absent' | 'holiday' | 'late' | null;
  isToday: boolean;
}

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrls: ['./student-attendance.component.scss']
})
export class StudentAttendanceComponent implements OnInit {
  currentDate = new Date();
  currentMonthName = '';
  currentYear = 0;
  
  calendarDays: CalendarDay[] = [];
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  totalPresent = 0;
  totalAbsent = 0;
  attendancePercentage = 0;

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.currentYear = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    this.currentMonthName = monthNames[month];

    const firstDay = new Date(this.currentYear, month, 1).getDay();
    const daysInMonth = new Date(this.currentYear, month + 1, 0).getDate();

    this.calendarDays = [];
    
    // Padding for previous month
    for (let i = 0; i < firstDay; i++) {
      this.calendarDays.push({ date: null, status: null, isToday: false });
    }

    // Mock data counters
    this.totalPresent = 0;
    this.totalAbsent = 0;
    let workingDays = 0;

    const today = new Date();

    // Days in current month
    for (let i = 1; i <= daysInMonth; i++) {
      let status: 'present' | 'absent' | 'holiday' | 'late' | null = null;
      
      const dayOfWeek = new Date(this.currentYear, month, i).getDay();
      
      // Mock data logic
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        status = 'holiday';
      } else {
        // Only generate status for past or current days
        const loopDate = new Date(this.currentYear, month, i);
        if (loopDate <= today) {
           workingDays++;
           // Randomly assign present, absent, or late
           const rand = Math.random();
           if (rand > 0.15) {
             status = 'present';
             this.totalPresent++;
           } else if (rand > 0.05) {
             status = 'absent';
             this.totalAbsent++;
           } else {
             status = 'late';
             this.totalPresent++; // late is counted as present usually
           }
        }
      }

      this.calendarDays.push({ 
        date: i, 
        status: status,
        isToday: today.getDate() === i && today.getMonth() === month && today.getFullYear() === this.currentYear
      });
    }

    if (workingDays > 0) {
      this.attendancePercentage = Math.round((this.totalPresent / workingDays) * 100);
    } else {
      this.attendancePercentage = 100;
    }
  }

  prevMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth() {
    this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    this.generateCalendar();
  }
}
