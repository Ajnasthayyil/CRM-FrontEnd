import { TestBed } from '@angular/core/testing';

import { AcademicHeadService } from './academic-head.service';

describe('AcademicHeadService', () => {
  let service: AcademicHeadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicHeadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
