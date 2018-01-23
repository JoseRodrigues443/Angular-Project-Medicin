import { Component, OnInit } from '@angular/core';
import { MedicalRecipesService } from '../../services/medical-recipes.service';
import { MedicalRecipe } from '../../models/medicalRecipe';

@Component({
  selector: 'app-dashboard-pharmacist',
  templateUrl: './dashboard-pharmacist.component.html',
  styleUrls: ['./dashboard-pharmacist.component.css']
})
export class DashboardPharmacistComponent implements OnInit {

  recipes: any;
  partialDispenses : number =0;
  totalDispenses: number =0;

  medicineNames: string[] = [];
  medicineDispensed: number[] = [];
  mostDispensedMedicine:string;
  leastDispensedMedicine:string;

   //dispenses counter
   months: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  constructor(private recipesService: MedicalRecipesService) { }

  ngOnInit() {
    this.recipesService.getMedicalRecipesFarm().subscribe(recipes => {
      this.recipes = recipes;
      this.checkDispendedPrescriptions();
      this.theMostDispensedMedicine();
      this.checkValues();
      this.dispensesPerMonth();
    })
  }

  //counts the total number of partial and total dispenses
  checkDispendedPrescriptions(){
    var quantityP=0,quantityD=0;

    for(var i=0;i<this.recipes.length;i++){
      console.log("receitas.length="+this.recipes.length)
      for(var j=0;j<this.recipes[i].prescriptions.length;j++){
        console.log("this.recipes[i].prescriptions.length="+this.recipes[i].prescriptions.length)
        quantityP = parseInt(this.recipes[i].prescriptions[j].quantity);
        console.log("this.recipes[i].prescriptions[j].dispenses.length="+this.recipes[i].prescriptions[j].dispenses.length)
        if(this.recipes[i].prescriptions[j].dispenses.length>0){
          for(var h = 0; h < this.recipes[i].prescriptions[j].dispenses.length;h++){
            console.log("this.recipes[i].prescriptions[j].dispenses.length="+this.recipes[i].prescriptions[j].dispenses.length)
            quantityD+=parseInt(this.recipes[i].prescriptions[j].dispenses[h].dispensedQuantity);
          }
          if(quantityD>=quantityP){
            this.totalDispenses++;
          }else if(quantityD<quantityP ){
            this.partialDispenses++;
            console.log("partialDispenses="+this.partialDispenses)
          }
        }
      }
    }
  }

  //Medicamento mais aviado
  theMostDispensedMedicine(){
    var med,pos;
    var quantityD=0;

    for(var i=0;i<this.recipes.length;i++){
      for(var j=0;j<this.recipes[i].prescriptions.length;j++){
        med = this.recipes[i].prescriptions[j].medicine;
        if(!this.medicineNames.includes(med)){
          this.medicineNames.push(med);
          pos = this.medicineNames.indexOf(med);
          this.medicineDispensed[pos]=0;
        }
        pos = this.medicineNames.indexOf(med);
        for(var h = 0; h < this.recipes[i].prescriptions[j].dispenses;h++){
          quantityD+=this.recipes[i].prescriptions[j].dispenses[h].dispensedQuantity;
        }
        this.medicineDispensed[pos]+=quantityD;
      }
    }
  }

  checkValues() {
    var higherValue = this.medicineDispensed[0];
    var lowerValue = this.medicineDispensed[0];
    var pos=0,posL=0, i;
    for (i = 0; i < this.medicineDispensed.length; i++) {
      if (this.medicineDispensed[i] >= higherValue) {
        higherValue = this.medicineDispensed[i];
        pos = i;
      }else if (this.medicineDispensed[i] < lowerValue){
        lowerValue = this.medicineDispensed[i];
        posL = i;
      }
    }

    if(this.medicineNames[posL]==undefined){
      this.leastDispensedMedicine="NaN";
    }else{
      this.leastDispensedMedicine=this.medicineNames[posL];
    }
    this.mostDispensedMedicine=this.medicineNames[pos];

    console.log("leastDispensedMedicine"+this.leastDispensedMedicine);
    console.log("mostDispensedMedicine"+this.mostDispensedMedicine);
  }


  //Qtd Aviamentos/Unidade de tempo
  dispensesPerMonth() {
    var date = new Date();
    var year = date.getFullYear();
    var dateSplit;
    var quantity=0;

    for (var i = 0; i < this.recipes.length; i++) {
      for(var j=0;j<this.recipes[i].prescriptions.length;j++){
        for(var h = 0; h < this.recipes[i].prescriptions[j].dispenses.length;h++){
          
          quantity+=this.recipes[i].prescriptions[j].dispenses[h].dispensedQuantity;
          
          dateSplit = this.recipes[i].prescriptions[j].dispenses[h].dispenseDate.split("-");
          if(dateSplit[0]==year){
            this.months[parseInt(dateSplit[1]) - 1]+=quantity;
          }
        }
      }
    }

    let data = [this.months[0], this.months[1], this.months[2], this.months[3], this.months[4], this.months[5],
    this.months[6], this.months[7], this.months[8], this.months[9], this.months[10], this.months[11]];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    this.barChartData.slice();
  }


  //Dispenses Per Month
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
      data: [], label: 'Number of Dispenses'
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public lineChartColors: Array<any> = [
    { // Logs - blue
      backgroundColor: 'rgba(234, 212, 65, 0.6)',
      borderColor: 'rgb(0,0,0)',
      pointBackgroundColor: 'rgb(255, 223, 10)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#16b3fc',
      pointHoverBorderColor: 'rgba(0,0, 0,0.8)'
    }
  ];
}
