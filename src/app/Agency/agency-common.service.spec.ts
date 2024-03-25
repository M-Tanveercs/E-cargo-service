/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgencyCommonService } from './agency-common.service';

describe('Service: AgencyCommon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgencyCommonService]
    });
  });

  it('should ...', inject([AgencyCommonService], (service: AgencyCommonService) => {
    expect(service).toBeTruthy();
  }));
});
