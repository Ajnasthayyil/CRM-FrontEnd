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

  @ViewChild("npaChart") npaChart!: ChartComponent;
  public npaChartOptions: Partial<LineChartOptions>;

  @ViewChild("mixChart") mixChart!: ChartComponent;
  public mixChartOptions: Partial<DonutChartOptions>;

  constructor(private authService: AuthService) {
    this.npaChartOptions = {
      series: [
        {
          name: "NPA %",
          data: [3.2, 3.1, 3.0, 2.9, 2.8, 2.7, 2.6]
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
      colors: ['#ef4444'],
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
        width: 3
      },
      markers: {
        size: 5,
        colors: ['#ef4444'],
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
        min: 2.4,
        max: 3.4,
        tickAmount: 4,
        labels: {
          style: {
            colors: 'var(--text-muted)'
          },
          formatter: (value) => { return value.toFixed(1); }
        }
      },
      tooltip: {
        theme: 'light',
        y: {
          formatter: function(val) {
            return val + "";
          }
        },
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          var val = series[seriesIndex][dataPointIndex];
          var cat = w.globals.labels[dataPointIndex];
          return '<div style="padding: 10px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">' +
            '<div style="color: var(--text-main); font-weight: 500; margin-bottom: 4px;">' + cat + '</div>' +
            '<div style="color: #ef4444; font-weight: 600;">NPA % : ' + val + '</div>' +
            '</div>';
        }
      }
    };

    this.mixChartOptions = {
      series: [35, 28, 18, 10, 6, 3],
      labels: ["Home Loan", "Business Loan", "SME Loan", "Auto Loan", "Personal Loan", "Others"],
      chart: {
        type: "donut",
        height: 250,
        fontFamily: 'Inter, sans-serif'
      },
      colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'],
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
        theme: 'light',
        custom: function({series, seriesIndex, dataPointIndex, w}) {
          var val = series[seriesIndex];
          var cat = w.globals.labels[seriesIndex];
          var color = w.globals.colors[seriesIndex];
          return '<div style="padding: 10px 16px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 8px;">' +
            '<span style="color: ' + color + '; font-weight: 500;">' + cat + ' : ' + val + '%</span>' +
            '</div>';
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
