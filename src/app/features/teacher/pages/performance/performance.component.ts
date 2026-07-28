import { Component, OnInit } from '@angular/core';
import { PerformanceRecord } from '../../models/performance.model';
import { PerformanceService } from '../../services/performance.service';
import { ToastService } from '../../../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsDialogComponent } from '../../../../shared/components/view-details-dialog/view-details-dialog.component';
@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  performanceRecords: PerformanceRecord[] = [];
  filteredRecords: PerformanceRecord[] = [];
  pagedRecords: PerformanceRecord[] = [];
  
  searchQuery: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  
  // Sorting
  sortColumn: string = 'studentName';
  sortDirection: 'asc' | 'desc' = 'asc';
  
  isLoading = true;
  Math = Math;

  constructor(
    private performanceService: PerformanceService,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPerformance();
  }

  loadPerformance(): void {
    this.isLoading = true;
    this.performanceService.getPerformanceRecords().subscribe(data => {
      this.performanceRecords = data || [];
      this.applyFilters();
      this.isLoading = false;
    });
  }

  applyFilters() {
    let result = [...this.performanceRecords];
    
    if (this.searchQuery) {
      const q = this.searchQuery.toLowerCase().trim();
      result = result.filter(r => 
        r.studentName.toLowerCase().includes(q) ||
        r.classId.toLowerCase().includes(q) ||
        r.assessmentName.toLowerCase().includes(q)
      );
    }
    
    // Sort
    result.sort((a: any, b: any) => {
      let valA = a[this.sortColumn];
      let valB = b[this.sortColumn];
      
      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();
      
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    this.filteredRecords = result;
    this.totalPages = Math.ceil(this.filteredRecords.length / this.itemsPerPage) || 1;
    this.setPage(1);
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(column: string): string {
    if (this.sortColumn !== column) return '↕';
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    this.pagedRecords = this.filteredRecords.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  viewDetails(record: PerformanceRecord) {
    this.dialog.open(ViewDetailsDialogComponent, {
      width: '500px',
      data: {
        title: 'Performance Details',
        details: [
          { label: 'Student Name', value: record.studentName },
          { label: 'Class ID', value: record.classId },
          { label: 'Assessment', value: record.assessmentName },
          { label: 'Score', value: record.score },
          { label: 'Total Marks', value: record.totalMarks },
          { label: 'Date', value: record.date },
          { label: 'Remarks', value: record.remarks || 'None' }
        ]
      }
    });
  }
}
