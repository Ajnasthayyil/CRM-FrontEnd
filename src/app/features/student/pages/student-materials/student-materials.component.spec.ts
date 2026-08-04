import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMaterialsComponent } from './student-materials.component';

describe('StudentMaterialsComponent', () => {
  let component: StudentMaterialsComponent;
  let fixture: ComponentFixture<StudentMaterialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentMaterialsComponent]
    });
    fixture = TestBed.createComponent(StudentMaterialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
