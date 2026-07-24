import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  activeTab: string = 'Personal';
  employeeId: string | null = null;
  employee: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.employeeId = params.get('id');
      this.loadEmployeeData();
    });
  }

  loadEmployeeData() {
    // Mock Data based on ID
    this.employee = {
      id: this.employeeId || 'EMP001',
      name: 'Sunita Patel',
      email: 'sunita.patel@educrm.in',
      personalEmail: 'sunita.patel.personal@gmail.com',
      phone: '+91 9876543210',
      initials: 'SP',
      avatarColor: 'purple',
      designation: 'Senior Teacher',
      department: 'Science',
      joinDate: '12 Aug 2020',
      status: 'Active',
      city: 'Mumbai',
      
      dob: '15 Sep 1985',
      gender: 'Female',
      bloodGroup: 'O+',
      maritalStatus: 'Married',
      nationality: 'Indian',
      emergencyContactName: 'Rahul Patel',
      emergencyContactPhone: '+91 9876543322',
      currentAddress: 'A-201, Sunshine Apartments, Andheri West, Mumbai, 400053',
      permanentAddress: 'A-201, Sunshine Apartments, Andheri West, Mumbai, 400053',
      
      reportingTo: 'Vikram Singh',
      employmentType: 'Full-Time',
      shift: 'Morning (07:30 AM - 03:00 PM)',
      
      bankName: 'HDFC Bank',
      accountNumber: '50100234567890',
      ifsc: 'HDFC0001234',
      panNumber: 'ABCDE1234F',
      aadharNumber: '1234 5678 9012',
      uan: '100987654321',
      
      attendancePercent: 98,
      leaveBalance: 12,
      performanceRating: 'Excellent',
      
      ctcAnnual: '8,40,000',
      salary: {
        basic: '35,000',
        hra: '15,000',
        specialAllowance: '10,000',
        gross: '60,000',
        
        pf: '1,800',
        pt: '200',
        tds: '3,000',
        totalDeductions: '5,000',
        
        net: '55,000'
      }
    };
  }

  setTab(tabName: string) {
    this.activeTab = tabName;
  }
}
