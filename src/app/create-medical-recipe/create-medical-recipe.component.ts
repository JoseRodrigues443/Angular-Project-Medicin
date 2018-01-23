import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { MedicalRecipe } from '../models/medicalRecipe';
import { MedicalRecipesService } from '../services/medical-recipes.service';
import { LogService } from '../services/log.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-create-medical-recipe',
  templateUrl: './create-medical-recipe.component.html',
  styleUrls: ['./create-medical-recipe.component.css']
})
export class CreateMedicalRecipeComponent implements OnInit {

  public myForm: FormGroup;
  loading = false;
  response: string;

  constructor(private _fb: FormBuilder, private medicalRecipesService: MedicalRecipesService,
     private logService: LogService,  private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      patient: ['', [Validators.required, Validators.minLength(5)]],
      prescriptions: this._fb.array([])
    });

    // add address
    this.addPrescription();

    /* subscribe to addresses value changes */
    // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  initPrescription() {
    return this._fb.group({
      presentation: ['', Validators.required],
      packagesNumber: ['', Validators.required],
      prescribedPosology: ['']
    });
  }

  addPrescription() {
    const control = <FormArray>this.myForm.controls['prescriptions'];
    const addrCtrl = this.initPrescription();

    control.push(addrCtrl);

    /* subscribe to individual address value changes */
    // addrCtrl.valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  removePrescription(i: number) {
    const control = <FormArray>this.myForm.controls['prescriptions'];
    control.removeAt(i);
  }

  save() {
    this.loading = true;
    let formObj = this.myForm.getRawValue();
    let serializedForm = JSON.stringify(formObj);
    console.log(serializedForm);

    console.log("--------------------------------->" + JSON.stringify(this.authenticationService.userInfo));


    this.medicalRecipesService.createMedicalRecipe(serializedForm).subscribe(result => {
      var res = JSON.stringify(result);
      var res2 = JSON.parse(res);
      this.response = res2.message;
      this.loading = false;
  })

          /**
       * To send to log api so it can be saved on mongoDB(logs DB)
       */
      var toLog = {
        title: "Angular: Create a Medical Recipe",
        description: "The user " + this.authenticationService.userInfo.userId + " has created a medical recipe",
        errors: "info"
      }
      this.logService.createLog(toLog).subscribe(result => {
      })

}

}