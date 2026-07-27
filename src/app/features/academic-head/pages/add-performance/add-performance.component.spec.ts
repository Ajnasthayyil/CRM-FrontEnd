import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPerformanceComponent } from './add-performance.component';

describe('AddPerformanceComponent', () => {
  let component: AddPerformanceComponent;
  let fixture: ComponentFixture<AddPerformanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPerformanceComponent]
    });
    fixture = TestBed.createComponent(AddPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
