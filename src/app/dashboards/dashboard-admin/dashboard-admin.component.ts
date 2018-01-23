import { Component, OnInit } from '@angular/core';
import { PresentationsService } from '../../services/presentations.service';
import { MedicalRecipesService } from '../../services/medical-recipes.service';
import { AdminService } from '../../services/admin.service';
import { Presentation } from '../../models/presentation';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {

  users: any[] = [];
  recipes: any[] = [];

  private doctors: number[] = [];
  private patients: number[] = [];
  private pharmacists: number[] = [];

  private doctorsIDS: string[] = [];
  private patientsIDS: string[] = [];
  private pharmacistsIDS: string[] = [];

  private doctorCount = 0;
  private patientCount = 0;
  private pharmacistCount = 0;

  private docWithMostReceitas: String;
  private pharmacistWithMostAviamentos: String;
  private patientWithMostAviamentos: String;

  constructor(private presentationsService: PresentationsService, private adminService: AdminService, private recipeService: MedicalRecipesService) { }

  ngOnInit() {

    this.recipeService.getMedicalRecipesFarm().subscribe(recipes => {
      this.recipes = recipes;
    });

    this.adminService.getUsers().subscribe(users => {
      this.users = users;
      console.log(users);
      this.prepareData();

    });
  }

  prepareData() {

    var pos: number;

    this.users.forEach(user => {
      if (user.roles[0] == "doctor") {
        this.doctorCount++;
        this.doctors.push(0);
        this.doctorsIDS.push(user._id);
      } else if (user.roles[0] == "patient") {
        this.patientCount++;
        this.patientsIDS.push(user._id);
        this.patients.push(0);
      } else {
        this.pharmacistCount++;
        this.pharmacistsIDS.push(user._id);
        this.pharmacists.push(0);
      }
    });

    this.recipes.forEach(function (recipe) {
      var doc = recipe.doctor;
      pos = this.doctorsIDS.indexOf(doc);
      this.doctors[pos]++;

      for (var i = 0; i < recipe.prescriptions.length; i++) {
        pos = this.patientsIDS.indexOf(recipe.patient);
        this.patients[pos]++;
        if (recipe.prescriptions[i].dispenses.length > 0) {
          for (var j = 0; j < recipe.prescriptions[i].dispenses.length; j++) {
            pos = this.pharmacistsIDS.indexOf(recipe.prescriptions[i].dispenses.pharmacist);
            this.pharmacists[pos]++;
          }
        }
      }
    });

    let maxDoc = -1;

    for (var i = 0; i < this.doctors.length; i++) {
      if (this.doctors[i] > maxDoc) {
        maxDoc = this.doctors[i];
        pos = i;
      }
    }
    this.docWithMostReceitas = this.doctorsIDS[pos];

    maxDoc = -1;

    for (var i = 0; i < this.patients.length; i++) {
      if (this.patients[i] > maxDoc) {
        maxDoc = this.patients[i];
        pos = i;
      }
    }
    this.patientWithMostAviamentos = this.patientsIDS[pos];

    maxDoc = -1;

    for (var i = 0; i < this.pharmacists.length; i++) {
      if (this.pharmacists[i] > maxDoc) {
        maxDoc = this.pharmacists[i];
        pos = i;
      }
    }
    this.pharmacistWithMostAviamentos = this.pharmacistsIDS[pos];

  }
}
