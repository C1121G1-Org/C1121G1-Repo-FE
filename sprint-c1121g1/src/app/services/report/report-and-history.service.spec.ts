import { TestBed } from '@angular/core/testing';

import { ReportAndHistoryService } from './report-and-history.service';

describe('ReportAndHistoryService', () => {
  let service: ReportAndHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportAndHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
