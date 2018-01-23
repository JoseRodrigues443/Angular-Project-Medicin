import { Component, OnInit } from '@angular/core';
import { MedicalRecipesService } from '../../services/medical-recipes.service';
import { MedicalRecipe } from '../../models/medicalRecipe';

@Component({
  selector: 'app-dashboard-patient',
  templateUrl: './dashboard-patient.component.html',
  styleUrls: ['./dashboard-patient.component.css']
})
export class DashboardPatientComponent implements OnInit {

  recipes: any;
  nRecipes: number;

  medicineNames: string[] = [];
  nMedicinePrescribed: number[] = [];
  mostPMedicine: string;
  leastPMedicine: string;

  contDispensed:number=0;
  contNotDispensed:number=0;

  constructor(private recipesService: MedicalRecipesService) { }

  ngOnInit() {
    this.recipesService.getMedicalRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.nRecipes = recipes.length;
      this.mostPrescribedMedicine();
      this.checkValues();
      this.dispensedRecipes();
    })
  }

  //The most prescribed medicine (singular) for this pacient
  mostPrescribedMedicine() {
    var pos;
    var med;
    for (var i = 0; i < this.recipes.length; i++) {
      for (var j = 0; j < this.recipes[i].prescriptions.length; j++) {

        med = this.recipes[i].prescriptions[j].medicine;
        if (!this.medicineNames.includes(med)) {
          this.medicineNames.push(med);
          pos = this.medicineNames.indexOf(med);
          this.nMedicinePrescribed[pos] = 1;
        } else {
          pos = this.medicineNames.indexOf(med);
          this.nMedicinePrescribed[pos]++;
        }
      }
    }
  }

  checkValues() {
    var higherValue = this.nMedicinePrescribed[0];
    var lowerValue = this.nMedicinePrescribed[0];
    var pos=0,posL=0, i;
    for (i = 0; i < this.nMedicinePrescribed.length; i++) {
      if (this.nMedicinePrescribed[i] >= higherValue) {
        higherValue = this.nMedicinePrescribed[i];
        pos = i;
      }else if (this.nMedicinePrescribed[i] < lowerValue){
        lowerValue = this.nMedicinePrescribed[i];
        posL = i;
      }
    }

    if(this.medicineNames[posL]==undefined){
      this.leastPMedicine="NaN";
    }else{
      this.leastPMedicine=this.medicineNames[posL];
    }
    this.mostPMedicine = this.medicineNames[pos];
  }

  //Recipes dispensed (total)
  dispensedRecipes(){
    for(var i = 0;i<this.recipes.length;i++){
      for(var j =0;j<this.recipes[i].prescriptions.length;j++){
        if(this.recipes[i].prescriptions[j].dispenses.length ==0){
          this.contNotDispensed++;
        }else{
          this.contDispensed++;
        }
      }
    }
  }
}
