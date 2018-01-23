import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMedicComponent } from './dashboard-medic.component';

describe('DashboardMedicComponent', () => {
  let component: DashboardMedicComponent;
  let fixture: ComponentFixture<DashboardMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
