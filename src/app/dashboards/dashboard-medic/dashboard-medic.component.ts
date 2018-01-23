import { Component, OnInit } from '@angular/core';
import { MedicalRecipesService } from '../../services/medical-recipes.service';
import { MedicalRecipe } from '../../models/medicalRecipe';
import { Presentation } from '../../models/presentation';
import { PresentationsService } from '../../services/presentations.service';
import { forEach } from '@angular/router/src/utils/collection';
import { $ } from 'protractor';

@Component({
  selector: 'app-dashboard-medic',
  templateUrl: './dashboard-medic.component.html',
  styleUrls: ['./dashboard-medic.component.css']
})
export class DashboardMedicComponent implements OnInit {

  recipes: any;

  presentations: Presentation[];

  //recipe counter
  months: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  medicineNames: string[] = [];
  nMedicinePrescribed: number[] = [];

  patientsVec: string[] = [];//variable's length count number of Pacients (widget)
  nComments: number=0;//variable to count number of comments (widget)
  prescriptions: number=0;//variable to count number of prescriptions (widget) 

  constructor(private recipesService: MedicalRecipesService, private presentationsService: PresentationsService) { }

  ngOnInit() {
    this.recipesService.getMedicalRecipes().subscribe(recipes => {
      this.recipes = recipes;
      //alert(JSON.stringify(this.recipes));
      this.nPatients();
      this.nPrescriptions();
      this.recipePerMonth();
      this.medicinePrescribed();
      this.barChartData.slice()
      this.barChartData2.slice()
    })
    this.presentationsService.getPresentations().subscribe(presentations => {
      this.presentations = presentations;
      this.countComments();
    })

  }

  //
  medicinePrescribed() {
    var pos;
    var med;
    for (var i = 0; i < this.recipes.length; i++) {
      for (var j = 0; j < this.recipes[i].prescriptions.length; j++) {

        med = this.recipes[i].prescriptions[j].medicine;
        if (!this.medicineNames.includes(med)) {
          this.medicineNames.push(med);
          pos = this.medicineNames.indexOf(med);
          this.nMedicinePrescribed[pos]=1;
        } else {
          pos = this.medicineNames.indexOf(med);
          this.nMedicinePrescribed[pos]++;
        }
      }
    }
    let data2 = this.nMedicinePrescribed;
    let clone2 = JSON.parse(JSON.stringify(this.barChartData2));
    clone2[0].data = data2;
    this.barChartData2 = clone2;
    this.barChartData2.slice();
  }

  //patients counter (widget)
  nPatients() {
    var pat;
    for (var i = 0; i < this.recipes.length; i++) {
      pat = this.recipes[i].patient;
      if (!this.patientsVec.includes(pat)) {
        this.patientsVec.push(pat);
      }
    }
    //return this.patientsVec.length;
  }

  //prescriptions counter (widget)
  nPrescriptions() {
    for (var i = 0; i < this.recipes.length; i++) {
      this.prescriptions += this.recipes[i].prescriptions.length;
    }
  }

  //counts recipes per respective month (graphic)
  recipePerMonth() {
    var date = new Date();
    var year = date.getFullYear();
    var month;

    for (var i = 0; i < this.recipes.length; i++) {
      month = this.recipes[i].recipeDate.split("-");
      if(month[0]==year){
        this.months[parseInt(month[1]) - 1]++;
      }
    }
    let data = [this.months[0], this.months[1], this.months[2], this.months[3], this.months[4], this.months[5],
    this.months[6], this.months[7], this.months[8], this.months[9], this.months[10], this.months[11]];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    this.barChartData.slice();
  }

  //comments counter
  countComments() {
    for (var i = 0; i < this.presentations.length; i++) {
      this.nComments += this.presentations[i].Comentarios.length;
    }
  }

  //Recipes per Month Graphic
  public barChartOptions: any = {
    maintainAspectRatio: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {
      data: [], label: 'Number of Recipes'
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  //The Most prescribed Medicine Graphic
  public barChartOptions2: any = {
    maintainAspectRatio: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels2: string[] = this.medicineNames;
  public barChartType2: string = 'bar';
  public barChartLegend2: boolean = true;

  public barChartData2: any[] = [
    { data:[], label: 'Number of Prescriptions' }
  ];


  public lineChartColors: Array<any> = [
    { // Logs - blue
      backgroundColor: 'rgba(0, 169, 249,0.5)',
      borderColor: 'rgba(0, 0, 0,1)',
      pointBackgroundColor: 'rgba(0, 169, 249,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(0, 169, 249,0.8)'
    }
  ];
}
