import { Component, OnInit } from '@angular/core';
import { TeacherAuthService } from '../../services/teacher-auth.service';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
  labels?: string[];
  responsive?: ApexResponsive[];
  dataLabels?: ApexDataLabels;
  colors?: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  teacher$ = this.authService.currentTeacher$;

  public attendanceChartOptions: Partial<ChartOptions>;
  public performanceChartOptions: Partial<ChartOptions>;

  constructor(private authService: TeacherAuthService) {
    this.attendanceChartOptions = {
      series: [85, 10, 3, 2],
      chart: {
        type: "donut",
        height: 300
      },
      labels: ["Present", "Absent", "Late", "Leave"],
      colors: ['#4CAF50', '#F44336', '#FFC107', '#2196F3'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    this.performanceChartOptions = {
      series: [
        {
          name: "Average Score",
          data: [72, 76, 81, 84, 86, 89]
        }
      ],
      chart: {
        height: 300,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#3f51b5'],
      title: {
        text: "Monthly Average Performance (%)",
        align: "left"
      },
      xaxis: {
        categories: [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun"
        ]
      }
    };
  }

  ngOnInit(): void {
  }
}
