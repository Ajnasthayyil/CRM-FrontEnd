import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexFill,
  ApexTooltip,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis?: ApexXAxis;
  yaxis?: ApexYAxis;
  title?: ApexTitleSubtitle;
  labels?: string[];
  responsive?: ApexResponsive[];
  dataLabels?: ApexDataLabels;
  colors?: string[];
  stroke?: ApexStroke;
  markers?: ApexMarkers;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
  legend?: ApexLegend;
};

interface SubjectPerformance {
  id: number;
  subject: string;
  teacher: string;
  term1Score: number;
  term2Score: number;
  finalScore: number;
  grade: string;
  status: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

@Component({
  selector: 'app-student-performance',
  templateUrl: './student-performance.component.html',
  styleUrls: ['./student-performance.component.scss']
})
export class StudentPerformanceComponent implements OnInit {
  performances: SubjectPerformance[] = [];
  overallGPA: number = 0;
  totalCredits: number = 0;
  rank: number = 12;

  public radarChartOptions!: Partial<ChartOptions>;
  public gpaTrendChartOptions!: Partial<ChartOptions>;

  ngOnInit() {
    this.performances = [
      { id: 1, subject: 'Mathematics', teacher: 'Mr. Smith', term1Score: 85, term2Score: 89, finalScore: 87, grade: 'A', status: 'excellent' },
      { id: 2, subject: 'Physics', teacher: 'Dr. Jones', term1Score: 78, term2Score: 82, finalScore: 80, grade: 'B+', status: 'good' },
      { id: 3, subject: 'Chemistry', teacher: 'Mrs. White', term1Score: 92, term2Score: 95, finalScore: 93.5, grade: 'A+', status: 'excellent' },
      { id: 4, subject: 'Biology', teacher: 'Ms. Green', term1Score: 70, term2Score: 75, finalScore: 72.5, grade: 'B', status: 'average' },
      { id: 5, subject: 'English Lit.', teacher: 'Mr. Brown', term1Score: 88, term2Score: 90, finalScore: 89, grade: 'A', status: 'excellent' },
      { id: 6, subject: 'History', teacher: 'Mrs. Davis', term1Score: 65, term2Score: 68, finalScore: 66.5, grade: 'C+', status: 'needs-improvement' }
    ];

    this.overallGPA = 3.8;
    this.totalCredits = 120;

    this.initCharts();
  }

  private initCharts() {
    this.radarChartOptions = {
      series: [
        {
          name: "My Performance",
          data: [87, 80, 93.5, 72.5, 89, 66.5]
        },
        {
          name: "Class Average",
          data: [75, 72, 78, 70, 82, 75]
        }
      ],
      chart: {
        height: 350,
        type: "radar",
        toolbar: {
          show: false
        }
      },
      title: {
        text: "Skill Analysis"
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.2
      },
      markers: {
        size: 4
      },
      xaxis: {
        categories: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English Lit.', 'History']
      },
      colors: ['#4F46E5', '#9CA3AF']
    };

    this.gpaTrendChartOptions = {
      series: [
        {
          name: "GPA",
          data: [3.4, 3.5, 3.6, 3.7, 3.8, 3.8]
        }
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 90, 100]
        }
      },
      colors: ['#10B981'],
      xaxis: {
        categories: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6']
      },
      yaxis: {
        min: 0,
        max: 4.0
      },
      title: {
        text: "GPA Trend Over Time",
        align: "left"
      }
    };
  }
}
