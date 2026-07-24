import { Component } from '@angular/core';

@Component({
  selector: 'app-leave-home',
  templateUrl: './leave-home.component.html',
  styleUrls: ['./leave-home.component.scss']
})
export class LeaveHomeComponent {
  leaveRequests = [
    {
      id: 'REQ001',
      empName: 'Sunita Patel',
      empId: 'EMP001',
      avatarColor: 'purple',
      initials: 'SP',
      type: 'Sick Leave',
      duration: '2 Days (25 Jul - 26 Jul)',
      reason: 'Fever and cold',
      status: 'Pending',
      appliedOn: 'Today, 09:00 AM'
    },
    {
      id: 'REQ002',
      empName: 'Kavita Rao',
      empId: 'EMP003',
      avatarColor: 'pink',
      initials: 'KR',
      type: 'Casual Leave',
      duration: '1 Day (24 Jul)',
      reason: 'Personal work',
      status: 'Approved',
      appliedOn: 'Yesterday'
    },
    {
      id: 'REQ003',
      empName: 'Anita Desai',
      empId: 'EMP005',
      avatarColor: 'blue',
      initials: 'AD',
      type: 'Earned Leave',
      duration: '5 Days (01 Aug - 05 Aug)',
      reason: 'Family vacation',
      status: 'Pending',
      appliedOn: 'Today, 10:30 AM'
    },
    {
      id: 'REQ004',
      empName: 'Rajeev Kumar',
      empId: 'EMP002',
      avatarColor: 'orange',
      initials: 'RK',
      type: 'Sick Leave',
      duration: '1 Day (22 Jul)',
      reason: 'Doctor appointment',
      status: 'Rejected',
      appliedOn: '20 Jul 2026'
    }
  ];

  leaveBalances = [
    { name: 'Sunita Patel', sick: 4, casual: 6, earned: 10 },
    { name: 'Rajeev Kumar', sick: 2, casual: 5, earned: 15 },
    { name: 'Kavita Rao', sick: 6, casual: 2, earned: 8 },
    { name: 'Vikram Singh', sick: 10, casual: 10, earned: 20 }
  ];

  updateStatus(req: any, status: string) {
    req.status = status;
  }
}
