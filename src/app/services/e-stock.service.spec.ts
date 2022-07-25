import { TestBed } from '@angular/core/testing';

import { EStockService } from './e-stock.service';

describe('EStockService', () => {
  let service: EStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
