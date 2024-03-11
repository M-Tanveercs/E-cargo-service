/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashCommonService } from './dash-common.service';

describe('Service: DashCommon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashCommonService]
    });
  });

  it('should ...', inject([DashCommonService], (service: DashCommonService) => {
    expect(service).toBeTruthy();
  }));
});
