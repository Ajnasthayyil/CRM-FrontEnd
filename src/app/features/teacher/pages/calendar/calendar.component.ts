import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  currentMonth: string = 'July 2026';
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: number[] = [];
  paddingDays: number[] = [0, 0, 0]; // 3 empty days for starting on Wednesday
  
  // Mock leaves/holidays
  leaves: Record<number, { type: 'leave' | 'holiday', reason: string }> = {
    4: { type: 'holiday', reason: 'Independence Day' },
    12: { type: 'leave', reason: 'Sick Leave (Approved)' },
    13: { type: 'leave', reason: 'Sick Leave (Approved)' },
    25: { type: 'holiday', reason: 'Weekend' },
    26: { type: 'holiday', reason: 'Weekend' }
  };

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    this.calendarDays = Array.from({length: 31}, (_, i) => i + 1);
  }

  getStatusForDay(day: number): string {
    const isWeekend = (day + 3) % 7 === 0 || (day + 3) % 7 === 6; // Just mock math based on July 2026
    if (this.leaves[day]) return this.leaves[day].type;
    if (isWeekend) return 'weekend';
    return 'workday';
  }

  getReasonForDay(day: number): string {
    if (this.leaves[day]) return this.leaves[day].reason;
    const isWeekend = (day + 3) % 7 === 0 || (day + 3) % 7 === 6;
    if (isWeekend) return 'Weekend';
    return '';
  }
}
