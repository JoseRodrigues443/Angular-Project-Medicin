import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosologyInfoComponent } from './posology-info.component';

describe('PosologyInfoComponent', () => {
  let component: PosologyInfoComponent;
  let fixture: ComponentFixture<PosologyInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosologyInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosologyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
