import { TestBed } from '@angular/core/testing';

import { MostrarAnimalesService } from './mostrar-animales.service';

describe('MostrarAnimalesService', () => {
  let service: MostrarAnimalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MostrarAnimalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
