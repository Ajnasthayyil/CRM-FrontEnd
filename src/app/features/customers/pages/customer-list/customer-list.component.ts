import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  // Now acting as Users / Students Directory
  customers = [
    {
      id: 'STU001',
      name: 'Rajesh Kumar Sharma',
      email: 'rajesh.sharma@student.educrm.in',
      initials: 'RK',
      avatarColor: 'blue',
      type: 'Grade 10',
      typeClass: 'badge-purple',
      creditScore: 94, // Used as Attendance %
      creditClass: 'score-green',
      loans: 5, // Used as Active Assignments
      outstanding: 'A-', // Used as Avg Grade
      rm: 'Priya Mehta', // Used as Class Teacher
      branch: 'Science', // Used as Department
      status: 'Active',
      statusClass: 'status-green',
      category: 'Student'
    },
    {
      id: 'TCH001',
      name: 'Sunita Patel',
      email: 'sunita.patel@educrm.in',
      initials: 'SP',
      avatarColor: 'purple',
      type: 'Senior Teacher',
      typeClass: 'badge-orange',
      creditScore: 98,
      creditClass: 'score-green',
      loans: 3, 
      outstanding: 'Excellent', 
      rm: 'N/A', 
      branch: 'Mathematics',
      status: 'Active',
      statusClass: 'status-green',
      category: 'Teacher'
    },
    {
      id: 'STU002',
      name: 'Arun Industries Pvt Ltd',
      email: 'arun@student.educrm.in',
      initials: 'AI',
      avatarColor: 'pink',
      type: 'Grade 12',
      typeClass: 'badge-green',
      creditScore: 78,
      creditClass: 'score-orange',
      loans: 2,
      outstanding: 'C+',
      rm: 'Kavita Rao',
      branch: 'Commerce',
      status: 'Suspended',
      statusClass: 'status-red',
      category: 'Student'
    },
    {
      id: 'STU003',
      name: 'Deepak Malhotra',
      email: 'deepak.m@student.educrm.in',
      initials: 'DM',
      avatarColor: 'pink',
      type: 'Grade 8',
      typeClass: 'badge-orange',
      creditScore: 91,
      creditClass: 'score-green',
      loans: 4,
      outstanding: 'B+',
      rm: 'Priya Mehta',
      branch: 'Arts',
      status: 'Active',
      statusClass: 'status-green',
      category: 'Student'
    }
  ];

  activeTab: string = 'All';
  searchQuery: string = '';
  isRefreshing: boolean = false;

  // Filter Modal
  showFilterModal: boolean = false;
  filterBranch: string = 'All';
  filterStatus: string = 'All';

  // Add Modal
  showAddModal: boolean = false;
  newCustomer = {
    name: '',
    email: '',
    category: 'Student',
    branch: 'Science'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get filteredCustomers() {
    return this.customers.filter(c => {
      // 1. Tab Filter
      if (this.activeTab !== 'All') {
        if (this.activeTab === 'Active' || this.activeTab === 'Suspended') {
          if (c.status !== this.activeTab) return false;
        } else {
          if (c.category !== this.activeTab) return false;
        }
      }

      // 2. Search Filter
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        if (
          !c.name.toLowerCase().includes(query) &&
          !c.id.toLowerCase().includes(query) &&
          !c.email.toLowerCase().includes(query) &&
          !c.branch.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // 3. Advanced Filter
      if (this.filterBranch !== 'All' && c.branch !== this.filterBranch) return false;
      if (this.filterStatus !== 'All' && c.status !== this.filterStatus) return false;

      return true;
    });
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  viewCustomer(id: string) {
    this.router.navigate(['/customers/360']);
  }

  // --- ACTIONS ---

  refreshList() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      alert('Data refreshed successfully!');
    }, 800);
  }

  triggerImport() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      alert(`Imported ${file.name} successfully!`);
      // Reset input
      event.target.value = '';
    }
  }

  exportList() {
    alert('User list exported as CSV successfully!');
  }

  // --- MODALS ---
  
  openFilterModal() {
    this.showFilterModal = true;
  }
  
  closeFilterModal() {
    this.showFilterModal = false;
  }
  
  applyFilters() {
    this.showFilterModal = false;
  }
  
  resetFilters() {
    this.filterBranch = 'All';
    this.filterStatus = 'All';
  }

  openAddModal() {
    this.newCustomer = { name: '', email: '', category: 'Student', branch: 'Science' };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  saveNewCustomer() {
    if (!this.newCustomer.name) return;
    
    const id = (this.newCustomer.category === 'Student' ? 'STU' : 'TCH') + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const initials = this.newCustomer.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    this.customers.unshift({
      id: id,
      name: this.newCustomer.name,
      email: this.newCustomer.email,
      initials: initials,
      avatarColor: 'blue',
      type: 'New Enrollee',
      typeClass: 'badge-purple',
      creditScore: 100,
      creditClass: 'score-green',
      loans: 0,
      outstanding: 'N/A',
      rm: 'System',
      branch: this.newCustomer.branch,
      status: 'Active',
      statusClass: 'status-green',
      category: this.newCustomer.category
    });
    
    this.showAddModal = false;
    alert(`User ${this.newCustomer.name} added!`);
  }
}
