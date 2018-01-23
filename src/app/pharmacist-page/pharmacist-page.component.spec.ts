import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacistPageComponent } from './pharmacist-page.component';

describe('PharmacistPageComponent', () => {
  let component: PharmacistPageComponent;
  let fixture: ComponentFixture<PharmacistPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacistPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
