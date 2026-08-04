import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexLegend,
  ApexYAxis,
  ApexGrid,
  ApexMarkers
} from "ng-apexcharts";

export type LineChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  colors: string[];
  grid: ApexGrid;
  markers: ApexMarkers;
};

export type DonutChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  colors: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
};

@Component({
  selector: 'app-role-dashboard',
  templateUrl: './role-dashboard.component.html',
  styleUrls: ['./role-dashboard.component.scss']
})
export class RoleDashboardComponent implements OnInit {
  currentRole: string | null = null;
  dateStr: string = 'Wednesday, 23 July 2024';

  @ViewChild("attendanceChart") attendanceChart!: ChartComponent;
  public attendanceChartOptions: Partial<LineChartOptions>;

  @ViewChild("mixChart") mixChart!: ChartComponent;
  public mixChartOptions: Partial<DonutChartOptions>;
  public deptChartOptions: Partial<DonutChartOptions>;
  public hrPerfChartOptions: Partial<DonutChartOptions>;
  public studentProgressChartOptions: Partial<LineChartOptions>;
  public dailyAttendanceChartOptions: any;

  constructor(private authService: AuthService) {
    this.attendanceChartOptions = {
      series: [
        {
          name: "Attendance %",
          data: [92, 93, 91, 94, 95, 94, 96]
        }
      ],
      chart: {
        height: 250,
        type: "line",
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#10b981'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      markers: {
        size: 5,
        colors: ['#10b981'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      grid: {
        borderColor: 'var(--border-color)',
        strokeDashArray: 4,
        xaxis: {
          lines: {
            show: true
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 0,
          right: 20,
          bottom: 0,
          left: 10
        }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: 'var(--text-muted)'
          }
        },
        tooltip: {
          enabled: false
        },
        crosshairs: {
          show: true,
          width: 1,
          position: 'back',
          opacity: 0.9,
          stroke: {
            color: 'var(--border-color)',
            width: 1,
            dashArray: 0
          }
        }
      },
      yaxis: {
        min: 85,
        max: 100,
        tickAmount: 3,
        labels: {
          style: {
            colors: 'var(--text-muted)'
          },
          formatter: (value) => { return value.toFixed(0) + '%'; }
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function(val) {
            return val + "%";
          }
        }
      }
    };

    this.mixChartOptions = {
      series: [40, 25, 20, 10, 5],
      labels: ["Primary", "Middle School", "High School", "Pre-Primary", "Special Ed"],
      chart: {
        type: "donut",
        height: 250,
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: false
            }
          },
          expandOnClick: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: 'light'
      }
    };

    this.deptChartOptions = {
      series: [35, 25, 20, 15, 5],
      labels: ["Science", "Mathematics", "Commerce", "Arts", "Languages"],
      chart: {
        type: "donut",
        height: 250,
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: {
              show: false
            }
          },
          expandOnClick: true
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      tooltip: {
        theme: 'light'
      }
    };

    this.hrPerfChartOptions = {
      series: [45, 30, 15, 10],
      labels: ["Excellent", "Good", "Average", "Needs Improvement"],
      chart: {
        type: "donut",
        height: 250,
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
      plotOptions: {
        pie: {
          donut: {
            size: '65%',
            labels: { show: false }
          },
          expandOnClick: true
        }
      },
      dataLabels: { enabled: false },
      legend: { show: false },
      tooltip: { theme: 'light' }
    };

    this.studentProgressChartOptions = {
      series: [
        {
          name: "Performance Score",
          data: [75, 82, 78, 85, 89, 92, 90]
        }
      ],
      chart: {
        height: 300,
        type: "area",
        zoom: { enabled: false },
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#3b82f6'],
      dataLabels: { enabled: false },
      stroke: { curve: "smooth", width: 3 },
      markers: { size: 5, colors: ['#3b82f6'], strokeColors: '#fff', strokeWidth: 2, hover: { size: 7 } },
      grid: {
        borderColor: 'var(--border-color)', strokeDashArray: 4,
        xaxis: { lines: { show: true } }, yaxis: { lines: { show: true } },
        padding: { top: 0, right: 20, bottom: 0, left: 10 }
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        axisBorder: { show: false }, axisTicks: { show: false },
        labels: { style: { colors: 'var(--text-muted)' } },
        tooltip: { enabled: false },
        crosshairs: { show: true, width: 1, position: 'back', opacity: 0.9, stroke: { color: 'var(--border-color)', width: 1, dashArray: 0 } }
      },
      yaxis: {
        min: 0, max: 100, tickAmount: 5,
        labels: { style: { colors: 'var(--text-muted)' }, formatter: (value) => { return value.toFixed(0) + '%'; } }
      },
      tooltip: { theme: 'light', y: { formatter: function(val) { return val + "%"; } } }
    };

    this.dailyAttendanceChartOptions = {
      series: [
        {
          name: "Attendance",
          data: [100, 100, 100, 0, 100, 100, 100]
        }
      ],
      chart: {
        height: 300,
        type: "bar",
        toolbar: { show: false },
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#10b981'],
      plotOptions: {
        bar: {
          borderRadius: 4,
          columnWidth: '40%',
          colors: {
            ranges: [{
              from: 0,
              to: 0,
              color: '#ef4444' // Red for absent
            }]
          }
        }
      },
      dataLabels: { enabled: false },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: { style: { colors: 'var(--text-muted)' } }
      },
      yaxis: {
        min: 0,
        max: 100,
        show: false
      },
      grid: {
        borderColor: 'var(--border-color)',
        strokeDashArray: 4,
        padding: { top: 0, right: 0, bottom: 0, left: 0 }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function(val: number) {
            return val === 100 ? "Present" : "Absent";
          }
        }
      }
    };
  }

  ngOnInit(): void {
    this.authService.currentRole$.subscribe(role => {
      this.currentRole = role;
    });
  }
}
