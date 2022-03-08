import { TestBed } from '@angular/core/testing';

import { CanActivateService } from './can-activate-guard.service';

describe('CanActivateService', () => {
  let service: CanActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
