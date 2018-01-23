import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMedicalRecipeComponent } from './edit-medical-recipe.component';

describe('EditMedicalRecipeComponent', () => {
  let component: EditMedicalRecipeComponent;
  let fixture: ComponentFixture<EditMedicalRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMedicalRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMedicalRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
