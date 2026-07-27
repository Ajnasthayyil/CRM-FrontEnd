import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-statistics-card',
  templateUrl: './statistics-card.component.html',
  styleUrls: ['./statistics-card.component.scss']
})
export class StatisticsCardComponent {
  @Input() title: string = '';
  @Input() value: string | number = '';
  @Input() iconClass: string = 'default-icon';
  @Input() iconColorClass: string = 'blue';
}
