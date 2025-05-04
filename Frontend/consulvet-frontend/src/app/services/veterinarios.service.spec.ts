import { TestBed } from '@angular/core/testing';

import { VeterinariosService } from './veterinarios.service';

describe('VeterinariosService', () => {
  let service: VeterinariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VeterinariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
