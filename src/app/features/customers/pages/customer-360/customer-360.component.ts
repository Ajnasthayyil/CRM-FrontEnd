import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-360',
  templateUrl: './customer-360.component.html',
  styleUrls: ['./customer-360.component.scss']
})
export class Customer360Component implements OnInit {
  
  // Mock Data
  users = [
    {
      id: 'STU001',
      name: 'Rajesh Kumar Sharma',
      email: 'rajesh.sharma@student.educrm.in',
      phone: '+91 98765 43210',
      city: 'Mumbai',
      pan: 'Guardian: Ramesh Sharma',
      gstin: 'Blood Group: O+',
      since: '2021-03-15',
      rm: 'Priya Mehta',
      branch: 'Science',
      industry: 'PCM',
      annualRevenue: 'Grade 10',
      type: 'Student',
      initials: 'RK',
      avatarColor: 'blue'
    },
    {
      id: 'TCH001',
      name: 'Sunita Patel',
      email: 'sunita.patel@educrm.in',
      phone: '+91 98765 11111',
      city: 'Delhi',
      pan: 'Emp ID: T-4921',
      gstin: 'Blood Group: A+',
      since: '2018-06-10',
      rm: 'Principal',
      branch: 'Mathematics',
      industry: 'Algebra, Calculus',
      annualRevenue: 'Senior Teacher',
      type: 'Teacher',
      initials: 'SP',
      avatarColor: 'purple'
    },
    {
      id: 'ADM001',
      name: 'Vikram Singh',
      email: 'vikram.admin@educrm.in',
      phone: '+91 98765 22222',
      city: 'Pune',
      pan: 'Emp ID: A-001',
      gstin: 'Blood Group: B+',
      since: '2015-04-01',
      rm: 'Director',
      branch: 'Management',
      industry: 'Operations',
      annualRevenue: 'School Admin',
      type: 'Admin',
      initials: 'VS',
      avatarColor: 'blue'
    },
    {
      id: 'HR001',
      name: 'Anjali Desai',
      email: 'anjali.hr@educrm.in',
      phone: '+91 98765 33333',
      city: 'Mumbai',
      pan: 'Emp ID: H-102',
      gstin: 'Blood Group: AB+',
      since: '2019-11-20',
      rm: 'Admin',
      branch: 'HR',
      industry: 'Recruitment, Payroll',
      annualRevenue: 'HR Manager',
      type: 'HR',
      initials: 'AD',
      avatarColor: 'purple'
    }
  ];

  customer: any;

  activeLoans = [
    {
      id: 'ASN001',
      type: 'Physics Project',
      amount: '3 Days',
      rate: 'Submitted',
      emi: 'A-',
      status: 'Graded'
    },
    {
      id: 'ASN002',
      type: 'Math Homework',
      amount: '5 Days',
      rate: 'Pending',
      emi: '-',
      status: 'Active'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        const found = this.users.find(u => u.id === id);
        if (found) {
          this.customer = found;
        } else {
          // If not found, use a mock generated one
          this.customer = {
            id: id,
            name: 'User ' + id,
            email: 'user@educrm.in',
            phone: '+91 99999 99999',
            city: 'Unknown',
            pan: 'N/A',
            gstin: 'N/A',
            since: '2024-01-01',
            rm: 'System',
            branch: 'General',
            industry: 'N/A',
            annualRevenue: 'Member',
            type: id.startsWith('STU') ? 'Student' : 'Staff',
            initials: 'US',
            avatarColor: 'pink'
          };
        }
      } else {
        this.customer = this.users[0];
      }
    });
  }
}
