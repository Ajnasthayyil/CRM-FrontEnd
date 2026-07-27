import { Component, OnInit } from '@angular/core';
import { TeacherService } from '../../services/teacher.service';
import { Teacher } from '../../models/teacher.model';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  teachers: Teacher[] = [];
  filteredTeachers: Teacher[] = [];
  pagedTeachers: Teacher[] = [];

  // Search & Filter
  searchQuery = '';
  filterStatus = 'All';
  
  // Pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  // Sorting
  sortColumn = 'name';
  sortDirection = 'asc';

  // Modal states
  showAddModal = false;
  showEditModal = false;
  showBlockModal = false;
  
  selectedTeacherId: string | null = null;
  teacherForm: Partial<Teacher> = {};

  constructor(
    private teacherService: TeacherService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.teacherService.getTeachers().subscribe(data => {
      // Map to add HR theme properties
      this.teachers = data.map(t => ({
        ...t,
        initials: t.name.split(' ').map(n => n[0]).join('').substring(0,2),
        avatarColor: this.getRandomColor(),
        designation: t.designation || 'Teacher',
        department: t.departmentId === 3 ? 'Computer Science' : 'Other'
      }));
      this.applyFilters();
    });
  }

  getRandomColor() {
    const colors = ['blue', 'purple', 'pink', 'orange'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // --- Filtering & Sorting ---

  applyFilters() {
    let result = this.teachers;

    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(t => 
        t.name.toLowerCase().includes(q) || 
        t.email.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q)
      );
    }

    if (this.filterStatus !== 'All') {
      result = result.filter(t => t.status === this.filterStatus);
    }

    result.sort((a, b) => {
      let valA = (a as any)[this.sortColumn] || '';
      let valB = (b as any)[this.sortColumn] || '';
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    this.filteredTeachers = result;
    this.totalPages = Math.ceil(this.filteredTeachers.length / this.itemsPerPage) || 1;
    this.setPage(1);
  }

  sortBy(col: string) {
    if (this.sortColumn === col) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = col;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(col: string) {
    if (this.sortColumn !== col) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  // --- Pagination ---

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.pagedTeachers = this.filteredTeachers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPagesArray() {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  get Math() {
    return Math;
  }

  // --- Actions ---

  refreshList() {
    this.loadData();
  }

  openAddModal() {
    this.teacherForm = { status: 'Active' as any, designation: 'Teacher', subject: '' };
    this.showAddModal = true;
  }

  openEditModal(id: string, event: Event) {
    event.stopPropagation();
    const t = this.teachers.find(x => x.id === id);
    if (t) {
      this.selectedTeacherId = id;
      this.teacherForm = { ...t };
      this.showEditModal = true;
    }
  }

  openBlockModal(id: string, event: Event) {
    event.stopPropagation();
    this.selectedTeacherId = id;
    this.showBlockModal = true;
  }

  saveAdd() {
    if (!this.teacherForm.name || !this.teacherForm.email) {
      this.toastService.error('Name and Email are required.');
      return;
    }
    // Mock save
    const newTeacher: Teacher = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: this.teacherForm.name,
      email: this.teacherForm.email,
      phone: this.teacherForm.phone || '',
      departmentId: 3,
      subject: this.teacherForm.subject || '',
      designation: this.teacherForm.designation || 'Teacher',
      status: this.teacherForm.status as any || 'Active',
      joiningDate: new Date().toISOString().split('T')[0],
      gender: '',
      dob: '',
      qualification: '',
      experience: '',
      attendanceStatus: 'Present',
      performanceStatus: 'Pending',
      photoUrl: '',
      attendanceSummary: {
        present: 0,
        absent: 0,
        leave: 0,
        late: 0,
        percentage: 0
      }
    };
    this.teachers.unshift(newTeacher);
    this.applyFilters();
    this.showAddModal = false;
    this.toastService.success('Teacher added successfully');
  }

  saveEdit() {
    const idx = this.teachers.findIndex(t => t.id === this.selectedTeacherId);
    if (idx !== -1) {
      this.teachers[idx] = { ...this.teachers[idx], ...this.teacherForm } as Teacher;
      this.applyFilters();
      this.showEditModal = false;
      this.toastService.success('Teacher updated successfully');
    }
  }

  confirmBlock() {
    const idx = this.teachers.findIndex(t => t.id === this.selectedTeacherId);
    if (idx !== -1) {
      this.teachers[idx].status = 'Inactive' as any;
      this.applyFilters();
      this.showBlockModal = false;
      this.toastService.success('Teacher has been blocked/deactivated');
    }
  }
}
