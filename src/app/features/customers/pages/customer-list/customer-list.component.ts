import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {

  customers = [
    {
      id: 'C001',
      name: 'Rajesh Kumar Sharma',
      email: 'rajesh.sharma@techcorp.in',
      initials: 'RK',
      avatarColor: 'blue',
      type: 'Proposal',
      typeClass: 'badge-purple',
      creditScore: 768,
      creditClass: 'score-green',
      loans: 3,
      outstanding: '₹42.5L',
      rm: 'Priya Mehta',
      branch: 'Mumbai Main',
      status: 'Active',
      statusClass: 'status-green'
    },
    {
      id: 'C002',
      name: 'Sunita Patel',
      email: 'sunita.patel@gmail.com',
      initials: 'SP',
      avatarColor: 'purple',
      type: 'Contacted',
      typeClass: 'badge-orange',
      creditScore: 712,
      creditClass: 'score-orange',
      loans: 1,
      outstanding: '₹28.0L',
      rm: 'Amit Singh',
      branch: 'Andheri West',
      status: 'Active',
      statusClass: 'status-green'
    },
    {
      id: 'C003',
      name: 'Arun Industries Pvt Ltd',
      email: 'finance@arunindustries.com',
      initials: 'AI',
      avatarColor: 'pink',
      type: 'Qualified',
      typeClass: 'badge-green',
      creditScore: 689,
      creditClass: 'score-orange',
      loans: 2,
      outstanding: '₹98.0L',
      rm: 'Kavita Rao',
      branch: 'Pune Central',
      status: 'Active',
      statusClass: 'status-green'
    },
    {
      id: 'C004',
      name: 'Deepak Malhotra',
      email: 'deepak.m@hotmail.com',
      initials: 'DM',
      avatarColor: 'pink',
      type: 'Contacted',
      typeClass: 'badge-orange',
      creditScore: 801,
      creditClass: 'score-green',
      loans: 2,
      outstanding: '₹35.0L',
      rm: 'Priya Mehta',
      branch: 'Mumbai Main',
      status: 'Active',
      statusClass: 'status-green'
    }
  ];

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  viewCustomer(id: string) {
    // Note: since routing is set up, navigating to /customers/360 for any ID
    this.router.navigate(['/customers/360']);
  }
}
