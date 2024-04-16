/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminCommonService } from './adminCommon.service';

describe('Service: AdminCommon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminCommonService]
    });
  });

  it('should ...', inject([AdminCommonService], (service: AdminCommonService) => {
    expect(service).toBeTruthy();
  }));
});
