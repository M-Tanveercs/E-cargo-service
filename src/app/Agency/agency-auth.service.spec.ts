/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgencyAuthService } from './agency-auth.service';

describe('Service: AgencyAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyAuthService]
    });
  });

  it('should ...', inject([AgencyAuthService], (service: AgencyAuthService) => {
    expect(service).toBeTruthy();
  }));
});
