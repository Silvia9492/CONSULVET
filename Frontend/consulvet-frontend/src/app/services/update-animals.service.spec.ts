import { TestBed } from '@angular/core/testing';

import { UpdateAnimalsService } from './update-animals.service';

describe('UpdateAnimalsService', () => {
  let service: UpdateAnimalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateAnimalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
