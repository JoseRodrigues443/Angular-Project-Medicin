import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPharmacistComponent } from './dashboard-pharmacist.component';

describe('DashboardPharmacistComponent', () => {
  let component: DashboardPharmacistComponent;
  let fixture: ComponentFixture<DashboardPharmacistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPharmacistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPharmacistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
