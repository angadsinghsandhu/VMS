import { TestBed } from '@angular/core/testing';

import { EntrysService } from './entrys.service';

describe('EntrysService', () => {
  let service: EntrysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntrysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
