import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { MedicalRecipesService } from './medical-recipes.service';

describe('MedicalRecipesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MedicalRecipesService,Http, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([MedicalRecipesService], (service: MedicalRecipesService) => {
    expect(service).toBeTruthy();
  }));

  it('service.getMedicalRecipes should be created', inject([MedicalRecipesService], (service: MedicalRecipesService) => {
    expect(service.getMedicalRecipes()).toBeTruthy();
  }));
  it('editPrescription should be created', inject([MedicalRecipesService], (service: MedicalRecipesService) => {
    expect(service).toBeTruthy();
  }));
  it('updatePrescription createMedicalRecipe should be created', inject([MedicalRecipesService], (service: MedicalRecipesService) => {
    expect(service).toBeTruthy();
  }));

  it('createMedicalRecipe should be created', inject([MedicalRecipesService], (service: MedicalRecipesService) => {
    expect(service).toBeTruthy();
  }));

});
