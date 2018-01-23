import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMedicalRecipeComponent } from './create-medical-recipe.component';

describe('CreateMedicalRecipeComponent', () => {
  let component: CreateMedicalRecipeComponent;
  let fixture: ComponentFixture<CreateMedicalRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMedicalRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMedicalRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
