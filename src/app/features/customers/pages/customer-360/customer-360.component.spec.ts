import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customer360Component } from './customer-360.component';

describe('Customer360Component', () => {
  let component: Customer360Component;
  let fixture: ComponentFixture<Customer360Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Customer360Component]
    });
    fixture = TestBed.createComponent(Customer360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
