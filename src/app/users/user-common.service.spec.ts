/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserCommonService } from './user-common.service';

describe('Service: UserCommon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCommonService]
    });
  });

  it('should ...', inject([UserCommonService], (service: UserCommonService) => {
    expect(service).toBeTruthy();
  }));
});
