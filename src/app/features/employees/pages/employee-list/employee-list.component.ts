import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  employees = [
    {
      id: 'EMP001',
      name: 'Sunita Patel',
      email: 'sunita.patel@educrm.in',
      phone: '+91 9876543210',
      initials: 'SP',
      avatarColor: 'purple',
      designation: 'Senior Teacher',
      typeClass: 'badge-purple',
      department: 'Science',
      joinDate: '12 Aug 2020',
      status: 'Active',
      statusClass: 'status-green'
    },
    {
      id: 'EMP002',
      name: 'Rajeev Kumar',
      email: 'rajeev.k@educrm.in',
      phone: '+91 9876543211',
      initials: 'RK',
      avatarColor: 'blue',
      designation: 'Department Head',
      typeClass: 'badge-orange',
      department: 'Mathematics',
      joinDate: '15 Jan 2018',
      status: 'Active',
      statusClass: 'status-green'
    },
    {
      id: 'EMP003',
      name: 'Kavita Rao',
      email: 'kavita.rao@educrm.in',
      phone: '+91 9876543212',
      initials: 'KR',
      avatarColor: 'pink',
      designation: 'Teacher',
      typeClass: 'badge-purple',
      department: 'Arts',
      joinDate: '01 Mar 2021',
      status: 'On Leave',
      statusClass: 'status-orange'
    },
    {
      id: 'EMP004',
      name: 'Vikram Singh',
      email: 'vikram.admin@educrm.in',
      phone: '+91 9876543213',
      initials: 'VS',
      avatarColor: 'blue',
      designation: 'Principal',
      typeClass: 'badge-green',
      department: 'Management',
      joinDate: '10 May 2015',
      status: 'Active',
      statusClass: 'status-green'
    },
    {
      id: 'EMP005',
      name: 'Anita Desai',
      email: 'anita.d@educrm.in',
      phone: '+91 9876543214',
      initials: 'AD',
      avatarColor: 'purple',
      designation: 'Librarian',
      typeClass: 'badge-purple',
      department: 'Library',
      joinDate: '22 Jul 2019',
      status: 'Inactive',
      statusClass: 'status-red'
    }
  ];

  filteredEmployees = [...this.employees];
  pagedEmployees: any[] = [];
  
  searchQuery: string = '';
  filterRole: string = 'All';
  filterStatus: string = 'All';
  
  roles = ['Teacher', 'Principal', 'Department Head', 'Non-Teaching Staff'];
  
  sortColumn: string = 'name';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;

  isRefreshing = false;
  
  Math = Math;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(urlSegment => {
      const path = urlSegment.length > 0 ? urlSegment[0].path : 'all';
      if (path === 'teachers') {
        this.filterRole = 'Teacher';
      } else if (path === 'non-teaching') {
        this.filterRole = 'Non-Teaching Staff';
      } else {
        this.filterRole = 'All';
      }
      this.applyFilters();
    });
  }
  
  getActiveCount(): number {
    return this.employees.filter(e => e.status === 'Active').length;
  }
  
  getOnLeaveCount(): number {
    return this.employees.filter(e => e.status === 'On Leave').length;
  }
  
  getTeachersCount(): number {
    return this.employees.filter(e => e.designation.includes('Teacher')).length;
  }
  
  getDeptHeadsCount(): number {
    return this.employees.filter(e => e.designation === 'Department Head').length;
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter(emp => {
      const matchSearch = this.searchQuery ? 
        (emp.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
         emp.id.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
         emp.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
         emp.department.toLowerCase().includes(this.searchQuery.toLowerCase())) : true;
         
      let matchRole = true;
      if (this.filterRole !== 'All') {
        if (this.filterRole === 'Teacher') {
          matchRole = emp.designation.includes('Teacher');
        } else if (this.filterRole === 'Non-Teaching Staff') {
          matchRole = !emp.designation.includes('Teacher') && emp.designation !== 'Principal' && emp.designation !== 'Department Head';
        } else {
          matchRole = emp.designation === this.filterRole;
        }
      }

      const matchStatus = this.filterStatus !== 'All' ? emp.status === this.filterStatus : true;
      
      return matchSearch && matchRole && matchStatus;
    });
    
    this.sortData();
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sortData();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  sortData() {
    this.filteredEmployees.sort((a, b) => {
      let valA = (a as any)[this.sortColumn];
      let valB = (b as any)[this.sortColumn];
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.updatePagination();
  }
  
  updatePagination() {
    this.totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage) || 1;
    if (this.currentPage > this.totalPages) this.currentPage = 1;
    
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.pagedEmployees = this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  setPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
  
  totalPagesArray(): number[] {
    return Array.from({length: this.totalPages}, (_, i) => i + 1);
  }

  refreshList() {
    this.isRefreshing = true;
    setTimeout(() => {
      this.applyFilters();
      this.isRefreshing = false;
    }, 800);
  }

  triggerImport() {
    this.fileInput.nativeElement.click();
  }

  exportList() {
    console.log('Exporting list...');
  }
  
  viewEmployee(id: string) {
    this.router.navigate(['/employees', id]);
  }
  
  editEmployee(id: string) {
    this.router.navigate(['/employees', id, 'edit']);
  }

  blockEmployee(id: string) {
    if (confirm('Are you sure you want to block this employee?')) {
      const emp = this.employees.find(e => e.id === id);
      if (emp) {
        emp.status = 'Inactive';
        emp.statusClass = 'status-red';
        this.applyFilters();
      }
    }
  }
}
