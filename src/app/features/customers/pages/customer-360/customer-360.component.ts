import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-360',
  templateUrl: './customer-360.component.html',
  styleUrls: ['./customer-360.component.scss']
})
export class Customer360Component implements OnInit {
  customer = {
    id: 'C001',
    name: 'Rajesh Kumar Sharma',
    email: 'rajesh.sharma@techcorp.in',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    pan: 'ABCDE1234F',
    gstin: '27ABCDE1234F1Z5',
    since: '2021-03-15',
    rm: 'Priya Mehta',
    branch: 'Mumbai Main',
    industry: 'Technology',
    annualRevenue: '₹8.5Cr',
    type: 'Corporate'
  };

  activeLoans = [
    {
      id: 'LN0001',
      type: 'Business Loan',
      amount: '₹50.0L',
      rate: '11.5%',
      emi: '₹1,05,432',
      status: 'Active'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
