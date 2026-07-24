import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-360',
  templateUrl: './customer-360.component.html',
  styleUrls: ['./customer-360.component.scss']
})
export class Customer360Component implements OnInit {
  customer = {
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
    type: 'Student'
  };

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

  constructor() { }

  ngOnInit(): void {
  }
}
