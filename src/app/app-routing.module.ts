import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MedicalRecipesComponent } from './medical-recipes/medical-recipes.component';
import { DoctorPageComponent } from './doctor-page/doctor-page.component';
import { PharmacistPageComponent } from './pharmacist-page/pharmacist-page.component';
import { CreateMedicalRecipeComponent } from './create-medical-recipe/create-medical-recipe.component';
import { PatientPageComponent } from './patient-page/patient-page.component';
import { EditMedicalRecipeComponent } from './edit-medical-recipe/edit-medical-recipe.component';
import { PosologyInfoComponent } from './posology-info/posology-info.component';
import { AlertsComponent } from './alerts/alerts.component';
import { HomeComponent } from './home/home.component';
import { StockPharmacyComponent } from './stock-pharmacy/stock-pharmacy.component';
import { MedicinesComponent } from './medicines/medicines.component';
import { AboutComponent } from './about/about.component';
import { CommentPresentationComponent } from './comment-presentation/comment-presentation.component';
import { ProviderPageComponent } from './provider-page/provider-page.component';
import { LogPageComponent } from './log-page/log-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { StatisticsLogPageComponent } from './statistics-log-page/statistics-log-page.component';

import { DashboardMedicComponent } from './dashboards/dashboard-medic/dashboard-medic.component';
import { DashboardPharmacistComponent } from './dashboards/dashboard-pharmacist/dashboard-pharmacist.component';
import { DashboardPatientComponent } from './dashboards/dashboard-patient/dashboard-patient.component';
import { DashboardAdminComponent } from './dashboards/dashboard-admin/dashboard-admin.component';
import { AuthGuard } from './guards/auth.guard';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/patient.guard';
import { PharmacistGuard } from './guards/pharmacist.guard';
import { DoctorPatientGuard } from './guards/doctor_patient.guard';
import { ProviderGuard } from './guards/provider.guard';
import { DashboardProviderComponent } from './dashboards/dashboard-provider/dashboard-provider.component';
//TODO
//import { LogGuard } from './guards/log.guard'; this is not gonna be neeeded probably, cause we can use only admin.guard
//TODO
// import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'comment', component: CommentPresentationComponent
  },
  {
    path: 'medicalRecipes', component: MedicalRecipesComponent,
    canActivate: [AuthGuard, DoctorPatientGuard]
  },
  {
    path: 'doctor', component: DoctorPageComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: 'pharmacist', component: PharmacistPageComponent,
    canActivate: [AuthGuard, PharmacistGuard]
  },
  {
    path: 'pharmacist/stock', component: StockPharmacyComponent,
    //canActivate: [AuthGuard, PharmacistGuard]
  },
  {
    path: 'createMedicalRecipe', component: CreateMedicalRecipeComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: 'editMedicalRecipe', component: EditMedicalRecipeComponent,
    canActivate: [AuthGuard, DoctorGuard]
  },
  {
    path: 'patient', component: PatientPageComponent,
    canActivate: [AuthGuard, PatientGuard]
  },
  {
    path: 'posologyInfo', component: PosologyInfoComponent,
    canActivate: [AuthGuard, PatientGuard]
  },
  {
    path: 'alerts', component: AlertsComponent,
    canActivate: [AuthGuard, PatientGuard]
  },
  {
    path: 'medicines', component: MedicinesComponent,
  },
  {
    path: 'provider', component: ProviderPageComponent,
    canActivate: [AuthGuard, ProviderGuard]
  },
  {
    path: 'log', component: LogPageComponent,
    //TODO:
    //canActivate: [AuthGuard, LogGuard]  // here can be AdminGuard instead of LogGuard so I do not have to create LogGuard!!!
  },
  {
    path: 'dashboardMedic', component: DashboardMedicComponent,
    //TODO:
    //canActivate: [AuthGuard, LogGuard]  // here can be AdminGuard instead of LogGuard so I do not have to create LogGuard!!!
  },
  {
    path: 'dashboardPharmacist', component: DashboardPharmacistComponent,
    //TODO:
    //canActivate: [AuthGuard, LogGuard]  // here can be AdminGuard instead of LogGuard so I do not have to create LogGuard!!!
  },
  {
    path: 'dashboardPatient', component: DashboardPatientComponent,
    //TODO:
    //canActivate: [AuthGuard, LogGuard]  // here can be AdminGuard instead of LogGuard so I do not have to create LogGuard!!!
  },
  {
    path: 'dashboardAdmin', component: DashboardAdminComponent,
    //TODO:
    //canActivate: [AuthGuard, LogGuard]  // here can be AdminGuard instead of LogGuard so I do not have to create LogGuard!!!
  },
  {
    path: 'dashboardProvider', component: DashboardProviderComponent,
    //TODO:
    //canActivate: [AuthGuard, LogGuard]  // here can be AdminGuard instead of LogGuard so I do not have to create LogGuard!!!
  },
  {
    path: 'admin', component: AdminPageComponent,
    //TODO:
    //canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'statisticsLog', component: StatisticsLogPageComponent,
    //TODO:
    //canActivate: [AuthGuard, AdminGuard]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }