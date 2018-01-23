import { Component, OnInit } from '@angular/core';
import { MedicalRecipe } from '../models/medicalRecipe';
import { MedicalRecipesService } from '../services/medical-recipes.service';
import { AlertsService } from '../services/alerts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PrescriptionComponent } from '../prescription/prescription.component';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  currentAlertDays: string;
  model: any = {};
  filteredPrescriptions: any = {};

  constructor(private router: Router, private alertsService: AlertsService) {

  }

  ngOnInit() {
    this.alertsService.getAlerts().subscribe(toReturn => {
      this.filteredPrescriptions = toReturn;
      //alert(JSON.stringify(this.filteredPrescriptions));
      //console.log(JSON.stringify(this.filteredPrescriptions));
    })
  }


  calcDaysToExpire(expirationDate: string) {
    var currentTime;
    var daysToExpire = new Date(expirationDate).getTime() - new Date().getTime();
    return (Math.trunc(daysToExpire / (1000 * 60 * 60 * 24)));
  }

  setAlertDays(val) {
    this.alertsService.setValue(val);
    this.currentAlertDays = val;
    this.router.navigate(['/patient']);
    this.router.navigate(['/alerts']);
  }

  refresh(): void {
    window.location.reload();
  }

}