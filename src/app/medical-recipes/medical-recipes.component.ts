import { Component, OnInit } from '@angular/core';
import { MedicalRecipe } from '../models/medicalRecipe';
import { MedicalRecipesService } from '../services/medical-recipes.service';

@Component({
  selector: 'app-medical-recipes',
  templateUrl: './medical-recipes.component.html',
  styleUrls: ['./medical-recipes.component.css']
})
export class MedicalRecipesComponent implements OnInit {

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