import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

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
      name: 'Arun Kumar',
      email: 'arun@student.educrm.in',
      initials: 'AK',
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
    },
    {
      id: 'ADM001',
      name: 'Vikram Singh',
      email: 'vikram.admin@educrm.in',
      initials: 'VS',
      avatarColor: 'blue',
      type: 'School Admin',
      typeClass: 'badge-purple',
      creditScore: 100,
      creditClass: 'score-green',
      loans: 0,
      outstanding: 'N/A',
      rm: 'N/A',
      branch: 'Management',
      status: 'Active',
      statusClass: 'status-green',
      category: 'Admin'
    },
    {
      id: 'HR001',
      name: 'Anjali Desai',
      email: 'anjali.hr@educrm.in',
      initials: 'AD',
      avatarColor: 'purple',
      type: 'HR Manager',
      typeClass: 'badge-green',
      creditScore: 95,
      creditClass: 'score-green',
      loans: 0,
      outstanding: 'N/A',
      rm: 'N/A',
      branch: 'HR',
      status: 'Active',
      statusClass: 'status-green',
      category: 'HR'
    },
    {
      id: 'TCH002',
      name: 'Rahul Verma',
      email: 'rahul.verma@educrm.in',
      initials: 'RV',
      avatarColor: 'pink',
      type: 'Junior Teacher',
      typeClass: 'badge-orange',
      creditScore: 88,
      creditClass: 'score-green',
      loans: 5,
      outstanding: 'Good',
      rm: 'Sunita Patel',
      branch: 'Science',
      status: 'Active',
      statusClass: 'status-green',
      category: 'Teacher'
    },
    {
      id: 'STU004',
      name: 'Neha Gupta',
      email: 'neha.g@student.educrm.in',
      initials: 'NG',
      avatarColor: 'blue',
      type: 'Grade 11',
      typeClass: 'badge-purple',
      creditScore: 99,
      creditClass: 'score-green',
      loans: 6,
      outstanding: 'A+',
      rm: 'Sunita Patel',
      branch: 'Mathematics',
      status: 'Active',
      statusClass: 'status-green',
      category: 'Student'
    }
  ];

  activeTab: string = 'All';
  searchQuery: string = '';
  isRefreshing: boolean = false;

  // Sorting
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filter Modal
  showFilterModal: boolean = false;
  filterBranch: string = 'All';
  filterStatus: string = 'All';
  filterRole: string = 'All';

  // Add Modal
  showAddModal: boolean = false;
  newCustomer = {
    name: '',
    email: '',
    category: 'Student',
    branch: 'Science'
  };

  currentUserRole: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.currentRole$.subscribe(role => {
      this.currentUserRole = role;
    });

    this.route.queryParams.subscribe(params => {
      if (params['branch']) {
        this.filterBranch = params['branch'];
      }
      if (params['role']) {
        this.filterRole = params['role'];
      }
      if (params['branch'] || params['role']) {
        // Automatically switch to All tab if navigating from sidebar to avoid tab logic conflict
        this.activeTab = 'All';
      }
    });
  }

  canSuspend(customer: any): boolean {
    if (!this.currentUserRole) return false;
    
    // Super Admin can suspend anyone
    if (this.currentUserRole === 'Super Admin') return true;

    // School Admin / Admin can suspend anyone EXCEPT Super Admin
    if (this.currentUserRole === 'School Admin' || this.currentUserRole === 'Admin') {
      if (customer.type === 'Super Admin') {
        return false;
      }
      return true;
    }
    
    // Principal can suspend anyone EXCEPT Super Admin, other Principals, and Admins
    if (this.currentUserRole === 'Principal') {
      if (customer.category === 'Admin' || customer.type === 'Principal' || customer.type === 'School Admin' || customer.type === 'Super Admin') {
        return false;
      }
      return true;
    }
    
    // Other roles cannot suspend
    return false;
  }

  toggleSuspend(customer: any) {
    if (customer.status === 'Active') {
      customer.status = 'Suspended';
      customer.statusClass = 'status-red';
    } else {
      customer.status = 'Active';
      customer.statusClass = 'status-green';
    }
  }

  get filteredCustomers() {
    let result = this.customers.filter(c => {
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
          !c.branch.toLowerCase().includes(query) &&
          !c.type.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // 3. Advanced Filter
      if (this.filterBranch !== 'All' && c.branch !== this.filterBranch) return false;
      if (this.filterStatus !== 'All' && c.status !== this.filterStatus) return false;
      if (this.filterRole !== 'All' && c.category !== this.filterRole) return false;

      return true;
    });

    // 4. Sorting
    if (this.sortColumn) {
      result.sort((a, b) => {
        let valA = (a as any)[this.sortColumn];
        let valB = (b as any)[this.sortColumn];
        
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  setTab(tab: string) {
    this.activeTab = tab;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
  }

  getSortIcon(column: string) {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  viewCustomer(id: string) {
    this.router.navigate(['/customers/360'], { queryParams: { id } });
  }

  // --- ACTIONS ---

  refreshList() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.isRefreshing = false;
      // alert('Data refreshed successfully!');
    }, 800);
  }

  triggerImport() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // alert(`Imported ${file.name} successfully!`);
      // Reset input
      event.target.value = '';
    }
  }

  exportList() {
    // alert('User list exported as CSV successfully!');
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
    this.filterRole = 'All';
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
    
    let prefix = 'STU';
    if (this.newCustomer.category === 'Teacher') prefix = 'TCH';
    if (this.newCustomer.category === 'HR') prefix = 'HR';
    if (this.newCustomer.category === 'Admin') prefix = 'ADM';
    
    const id = prefix + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const initials = this.newCustomer.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    
    this.customers.unshift({
      id: id,
      name: this.newCustomer.name,
      email: this.newCustomer.email,
      initials: initials,
      avatarColor: 'blue',
      type: 'New ' + this.newCustomer.category,
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
    // alert(`User ${this.newCustomer.name} added!`);
  }
}
