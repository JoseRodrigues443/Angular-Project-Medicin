import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPharmacyComponent } from './stock-pharmacy.component';

describe('StockPharmacyComponent', () => {
  let component: StockPharmacyComponent;
  let fixture: ComponentFixture<StockPharmacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockPharmacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
