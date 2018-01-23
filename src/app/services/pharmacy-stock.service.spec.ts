import { TestBed, inject } from '@angular/core/testing';

import { PharmacyStockService } from './pharmacy-stock.service';

describe('PharmacyStockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PharmacyStockService]
    });
  });

  it('should be created', inject([PharmacyStockService], (service: PharmacyStockService) => {
    expect(service).toBeTruthy();
  }));
});
