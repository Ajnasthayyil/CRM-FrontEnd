import { Component } from '@angular/core';

@Component({
  selector: 'app-reports-home',
  templateUrl: './reports-home.component.html',
  styleUrls: ['./reports-home.component.scss']
})
export class ReportsHomeComponent {
  reports = [
    { title: 'Employee Attendance Summary', category: 'Attendance', lastGenerated: 'Today, 08:00 AM', status: 'Ready', statusClass: 'status-active' },
    { title: 'Monthly Payroll Overview', category: 'Payroll', lastGenerated: 'Jul 25, 2026', status: 'Ready', statusClass: 'status-active' },
    { title: 'Leave Balance Report', category: 'Leave', lastGenerated: 'Jul 20, 2026', status: 'Processing', statusClass: 'status-pending' },
    { title: 'Department wise Headcount', category: 'HR', lastGenerated: 'Jul 15, 2026', status: 'Ready', statusClass: 'status-active' },
    { title: 'New Hire Onboarding Status', category: 'Recruitment', lastGenerated: 'Jul 10, 2026', status: 'Ready', statusClass: 'status-active' }
  ];

  toasterMessage: string | null = null;
  toasterTimeout: any;

  showToaster(message: string) {
    this.toasterMessage = message;
    if (this.toasterTimeout) {
      clearTimeout(this.toasterTimeout);
    }
    this.toasterTimeout = setTimeout(() => {
      this.toasterMessage = null;
    }, 3000);
  }

  createReport() {
    this.showToaster('Opening custom report builder...');
  }

  viewReport(report: any) {
    this.showToaster(`Loading report: ${report.title}`);
  }

  downloadReport(report: any) {
    this.showToaster(`Downloading ${report.title} as PDF...`);
  }
}
