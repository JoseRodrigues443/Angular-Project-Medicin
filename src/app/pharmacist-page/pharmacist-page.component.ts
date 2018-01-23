import { Component, OnInit } from '@angular/core';
import { MedicalRecipe } from '../models/medicalRecipe';
import { MedicalRecipesService } from '../services/medical-recipes.service';
import { LogService } from '../services/log.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-pharmacist-page',
  templateUrl: './pharmacist-page.component.html',
  styleUrls: ['./pharmacist-page.component.css']
})
export class PharmacistPageComponent {

  loading = false;
  loading2 = false;
  model: any = {};
  medicalRecipe: MedicalRecipe;
  response: string;

  constructor(private medicalRecipesService: MedicalRecipesService,
    private logService: LogService,  private authenticationService: AuthenticationService) { }

  searchMedicalRecipe() {
    this.loading = true;
    this.medicalRecipesService.getMedicalRecipeById(this.model.searchMedicalRecipeId).subscribe(medicalRecipe => {
      this.medicalRecipe = medicalRecipe;
      this.loading = false;
    })
  }

  dispensePrescription() {
    this.loading2 = true;
    this.medicalRecipesService.updatePrescription(this.model.searchMedicalRecipeId, this.model.prescriptionId, this.model.dispensedQuantity).subscribe(result => {
      var res = JSON.stringify(result);
      var res2 = JSON.parse(res);
      this.response = res2.message;
      this.loading2 = false;

      /**
* To send to log api so it can be saved on mongoDB(logs DB)
*/
      var toLog = {
        title: "Angular: Dispense Prescription",
        description: "The user " + this.authenticationService.userInfo.userId + " has dispensed medical prescription(s).",
        errors: "info"
      }
      this.logService.createLog(toLog).subscribe(result => {
      })

      this.searchMedicalRecipe();
    })
  }
}
