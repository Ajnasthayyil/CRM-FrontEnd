import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
  @ViewChildren('scrollElement') scrollElements!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;

  mouseX = 0;
  mouseY = 0;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    this.scrollElements.forEach(el => {
      this.observer?.observe(el.nativeElement);
    });
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
