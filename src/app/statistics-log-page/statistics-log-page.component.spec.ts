import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticsLogPageComponent } from './statistics-log-page.component';

describe('StatisticsLogPageComponent', () => {
  let component: StatisticsLogPageComponent;
  let fixture: ComponentFixture<StatisticsLogPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatisticsLogPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatisticsLogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
