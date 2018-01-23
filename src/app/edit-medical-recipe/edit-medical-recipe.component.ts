import { Component, OnInit } from '@angular/core';
import { MedicalRecipe } from '../models/medicalRecipe';
import { MedicalRecipesService } from '../services/medical-recipes.service';
import { LogService } from '../services/log.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-edit-medical-recipe',
  templateUrl: './edit-medical-recipe.component.html',
  styleUrls: ['./edit-medical-recipe.component.css']
})
export class EditMedicalRecipeComponent {

  loading = false;
  loading2 = false;
  model: any = {};
  medicalRecipe: MedicalRecipe;
  response: string;
  error: string;

  constructor(private medicalRecipesService: MedicalRecipesService,
    private logService: LogService, private authenticationService: AuthenticationService) { }

  searchMedicalRecipe() {
    this.loading = true;
    this.medicalRecipesService.getMedicalRecipeById(this.model.searchMedicalRecipeId).subscribe(medicalRecipe => {
      if (medicalRecipe) {
        this.medicalRecipe = medicalRecipe;
      } else {
        this.error = "Medical Recipe not found!";
      }
      this.loading = false;
    })
  }

  editMedicalRecipe() {
    this.loading2 = true;
    this.response = '';
    this.medicalRecipesService.editPrescription(this.model.searchMedicalRecipeId, this.model.prescriptionId, this.model.presentation, this.model.packagesNumber, this.model.prescribedPosology).subscribe(result => {
      var res = JSON.stringify(result);
      var res2 = JSON.parse(res);
      this.response = res2.message;
      console.log(this.response);

      /**
* To send to log api so it can be saved on mongoDB(logs DB)
*/
      var toLog = {
        title: "Angular: Edition of a Medical Recipe",
        description: "The user " + this.authenticationService.userInfo.userId + " has edited a medical recipe",
        errors: "info"
      }
      this.logService.createLog(toLog).subscribe(result => {
      })

      this.loading2 = false;
      this.searchMedicalRecipe();
    })
  }
}