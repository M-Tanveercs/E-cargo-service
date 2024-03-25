import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { agencyAuthGuardGuard } from './agency-auth-guard.guard';

describe('agencyAuthGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => agencyAuthGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
