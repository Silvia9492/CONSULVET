import { TestBed } from '@angular/core/testing';

import { EliminarAnimalService } from './eliminar-animal.service';

describe('EliminarAnimalService', () => {
  let service: EliminarAnimalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EliminarAnimalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
