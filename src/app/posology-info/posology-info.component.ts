import { Component, OnInit } from '@angular/core';
import { MedicalRecipe } from '../models/medicalRecipe';
import { MedicalRecipesService } from '../services/medical-recipes.service';

@Component({
  selector: 'app-posology-info',
  templateUrl: './posology-info.component.html',
  styleUrls: ['./posology-info.component.css']
})
export class PosologyInfoComponent implements OnInit {

  medicalRecipes: MedicalRecipe[] = [];

  constructor(
    private medicalRecipesService: MedicalRecipesService) {

  }

  ngOnInit() {
    this.medicalRecipesService.getMedicalRecipes().subscribe(medicalRecipes => {
      this.medicalRecipes = medicalRecipes;
    })
  }
  
}
