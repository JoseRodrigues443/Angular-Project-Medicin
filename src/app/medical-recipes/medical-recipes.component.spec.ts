import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalRecipesComponent } from './medical-recipes.component';

describe('MedicalRecipesComponent', () => {
  let component: MedicalRecipesComponent;
  let fixture: ComponentFixture<MedicalRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
