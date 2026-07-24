import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

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
      statusClass: 'status-green',
      category: 'Corporate'
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
      statusClass: 'status-green',
      category: 'Individual'
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
      status: 'Blocked',
      statusClass: 'status-red',
      category: 'SME'
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
      statusClass: 'status-green',
      category: 'Individual'
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
    category: 'Individual',
    branch: 'Mumbai Main'
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get filteredCustomers() {
    return this.customers.filter(c => {
      // 1. Tab Filter
      if (this.activeTab !== 'All') {
        if (this.activeTab === 'Active' || this.activeTab === 'Blocked') {
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
    alert('Customer list exported as CSV successfully!');
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
    this.newCustomer = { name: '', email: '', category: 'Individual', branch: 'Mumbai Main' };
    this.showAddModal = true;
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  saveNewCustomer() {
    if (!this.newCustomer.name) return;
    
    const id = 'C' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const initials = this.newCustomer.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    this.customers.unshift({
      id: id,
      name: this.newCustomer.name,
      email: this.newCustomer.email,
      initials: initials,
      avatarColor: 'blue',
      type: 'New',
      typeClass: 'badge-purple',
      creditScore: 0,
      creditClass: 'score-orange',
      loans: 0,
      outstanding: '₹0L',
      rm: 'System',
      branch: this.newCustomer.branch,
      status: 'Active',
      statusClass: 'status-green',
      category: this.newCustomer.category
    });
    
    this.showAddModal = false;
    alert(`Customer ${this.newCustomer.name} added!`);
  }
}
