import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { MedicalRecipe } from '../models/medicalRecipe';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class MedicalRecipesService {
  medicalRecipeId: string;
  /* private medicalRecipesUrl = 'http://localhost:3000/api/medicalRecipe'; */
  private medicalRecipesUrl = 'https://ec2-35-177-186-111.eu-west-2.compute.amazonaws.com:3000/api/medicalRecipe/'/*'http://ec2-35-176-41-55.eu-west-2.compute.amazonaws.com:3000/api/medicalRecipe'*/;

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  getMedicalRecipes(): Observable<MedicalRecipe[]> {
    return this.http.get<MedicalRecipe[]>(this.medicalRecipesUrl,
      this.getHeaders());
  }
  getMedicalRecipesFarm(): Observable<MedicalRecipe[]> {
    return this.http.get<MedicalRecipe[]>(this.medicalRecipesUrl+"getAll/",
      this.getHeaders());
  }
  getHeaders() {
    let headers = new HttpHeaders({
      'x-access-token':
      this.authenticationService.userInfo.token
    });

    let httpOptions = {
      headers: headers
    };
    return httpOptions;
  }

  getMedicalRecipeById(searchId): Observable<MedicalRecipe> {
    return this.http.get<MedicalRecipe>(this.medicalRecipesUrl + searchId,
      this.getHeaders());
  }

  updatePrescription(searchId, prescriptionId, dispensedQuantity) {
    return this.http.put(this.medicalRecipesUrl + searchId + "/prescription/" + prescriptionId + "/dispense", { 'dispensedQuantity': dispensedQuantity }, this.getHeaders());
  }

  createMedicalRecipe(requestBody: string){
    console.log(requestBody);
    return this.http.post(this.medicalRecipesUrl, JSON.parse(requestBody), this.getHeaders());
  }

  editPrescription(searchId, prescriptionId, presentation, packagesNumber, prescribedPosology) {
    let requestBody = { 'presentation': presentation, 'packagesNumber': packagesNumber, 'prescribedPosology': prescribedPosology };
    return this.http.put(this.medicalRecipesUrl + searchId + "/prescription/" + prescriptionId, requestBody, this.getHeaders());
  }

}
