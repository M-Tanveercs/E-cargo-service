import { TestBed } from '@angular/core/testing';

import { AgencyDashService } from './agency-dash.service';

describe('AgencyDashService', () => {
  let service: AgencyDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
