import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MedicalRecipesComponent } from './medical-recipes/medical-recipes.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './/app-routing.module';

import { MedicalRecipesService } from './services/medical-recipes.service';
import { AuthenticationService } from './services/authentication.service';
import { RegisterService } from './services/register.service';
import { AlertsService } from './services/alerts.service';
import { PresentationsService } from './services/presentations.service';
import { PharmacyStockService } from './services/pharmacy-stock.service';
import { ProviderService } from './services/provider.service';
import { LogService } from './services/log.service';

import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { PharmacistGuard } from './guards/pharmacist.guard';
import { DoctorPatientGuard } from './guards/doctor_patient.guard';
import { ProviderGuard } from './guards/provider.guard';
//TODO:
// import { LogGuard } from './guards/log.guard'; only admin guard is necessary
//TODO:
// import { AdminGuard } from './guards/admin.guard';

import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { PharmacistPageComponent } from './pharmacist-page/pharmacist-page.component';
import { CreateMedicalRecipeComponent } from './create-medical-recipe/create-medical-recipe.component';
import { PrescriptionComponent } from './prescription/prescription.component';
import { EditMedicalRecipeComponent } from './edit-medical-recipe/edit-medical-recipe.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { PosologyInfoComponent } from './posology-info/posology-info.component';
import { AlertsComponent } from './alerts/alerts.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { EulaComponent } from './eula/eula.component';
import { HomeComponent } from './home/home.component';
import { StockPharmacyComponent } from './stock-pharmacy/stock-pharmacy.component';
import { AboutComponent } from './about/about.component';
import { CommentPresentationComponent } from './comment-presentation/comment-presentation.component';
import { ProviderPageComponent } from './provider-page/provider-page.component';
import { LogPageComponent } from './log-page/log-page.component';

import { AgmCoreModule } from '@agm/core';
import { LicenseComponent } from './license/license.component';

import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

import { StatisticsLogPageComponent } from './statistics-log-page/statistics-log-page.component';

import { DashboardMedicComponent } from './dashboards/dashboard-medic/dashboard-medic.component';
import { DashboardPharmacistComponent } from './dashboards/dashboard-pharmacist/dashboard-pharmacist.component';
import { DashboardPatientComponent } from './dashboards/dashboard-patient/dashboard-patient.component';
import { DashboardAdminComponent } from './dashboards/dashboard-admin/dashboard-admin.component';
import { DashboardProviderComponent } from './dashboards/dashboard-provider/dashboard-provider.component';
import { AdminService } from './services/admin.service';



@NgModule({
  declarations: [
    AppComponent,
    MedicalRecipesComponent,
    LoginComponent,
    RegisterComponent,
    DoctorPageComponent,
    PharmacistPageComponent,
    CreateMedicalRecipeComponent,
    PrescriptionComponent,
    EditMedicalRecipeComponent,
    PatientPageComponent,
    PosologyInfoComponent,
    AlertsComponent,
    MedicinesComponent,
    EulaComponent,
    HomeComponent,
    StockPharmacyComponent,
    AboutComponent,
    CommentPresentationComponent,
    ProviderPageComponent,
    LicenseComponent,
    ChartComponent,
    LogPageComponent,
    AdminPageComponent,
    StatisticsLogPageComponent,
    DashboardMedicComponent,
    DashboardPharmacistComponent,
    DashboardPatientComponent,
    DashboardAdminComponent,
    DashboardProviderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_cShMkhuY3-ka4D_Bc2LxgNCvB3JAeL0'
    })
  ],
  providers: [AuthGuard,
    DoctorGuard,
    PatientGuard,
    PharmacistGuard,
    DoctorPatientGuard,
    ProviderGuard,
    //TODO:
    // LogGuard, not gonna be needed
    //TODO
    // AdminGuard,
    AdminService,
    AuthenticationService,
    MedicalRecipesService,
    RegisterService,
    AlertsService,
    PresentationsService,
    PharmacyStockService,
    ProviderService,
    LogService
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }