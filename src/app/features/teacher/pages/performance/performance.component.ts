import { Component, OnInit } from '@angular/core';
import { PerformanceRecord } from '../../models/performance.model';
import { PerformanceService } from '../../services/performance.service';
import { ToastService } from '../../../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDetailsDialogComponent } from '../../../../shared/components/view-details-dialog/view-details-dialog.component';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexDataLabels,
  ApexPlotOptions,
  ApexTheme
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  theme: ApexTheme;
};
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

  public chartOptions: Partial<ChartOptions> | any = {};
  public showChart = false;

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
      this.updateChart();
      this.isLoading = false;
    });
  }

  updateChart(): void {
    if (!this.filteredRecords || this.filteredRecords.length === 0) {
      this.showChart = false;
      return;
    }

    const typeMap = new Map<string, { total: number, count: number }>();

    this.filteredRecords.forEach(r => {
      const type = r.assessmentType;
      const current = typeMap.get(type) || { total: 0, count: 0 };
      current.total += r.percentage;
      current.count += 1;
      typeMap.set(type, current);
    });

    const categories = Array.from(typeMap.keys());
    const data = categories.map(k => {
      const item = typeMap.get(k)!;
      return Number((item.total / item.count).toFixed(2));
    });

    this.chartOptions = {
      series: [
        {
          name: "Average Score (%)",
          data: data
        }
      ],
      chart: {
        type: "bar",
        height: 350,
        toolbar: { show: false },
        background: 'transparent'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '45%'
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        style: {
          colors: ['#fff']
        }
      },
      xaxis: {
        categories: categories,
        labels: {
          style: { cssClass: 'chart-text' }
        }
      },
      theme: {
        mode: 'light',
        palette: 'palette1'
      },
      title: {
        text: "Average Scores by Assessment Type",
        align: 'left',
        style: {
          fontSize: '16px',
          fontWeight: 600,
          color: 'var(--text-main)'
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function (val: any) {
            return val + "%";
          }
        }
      }
    };
    this.showChart = true;
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
    this.updateChart();
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
          { label: 'Score', value: record.obtainedMarks },
          { label: 'Total Marks', value: record.maximumMarks },
          { label: 'Date', value: record.date },
          { label: 'Remarks', value: record.teacherRemarks || 'None' }
        ]
      }
    });
  }
}
