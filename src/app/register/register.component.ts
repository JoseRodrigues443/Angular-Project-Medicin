import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../services/register.service';

import { LogService } from '../services/log.service';

import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  model: any = {};
  loading = false;
  error = '';
  response: string;
  successMessage = 'User created!'
  eulas;
  constructor(private router: Router, private activatedRoute: ActivatedRoute, private registerService: RegisterService,
    private logService: LogService) { }

  ngOnInit() {
    //this.readFromFile();
  }

  register() {
    this.loading = true;
    this.registerService.create(this.model.name, this.model.email, this.model.password).subscribe((result) => {
      this.loading = false;
      var res = JSON.stringify(result);
      var res2 = JSON.parse(res);
      this.response = res2.message;
      console.log(this.response);

      /**
       * To send to log api so it can be saved on mongoDB(logs DB)
       */
      var toLog = {
        title: "Angular: Register",
        description: "The user" + this.model.email + " has created an account",
        errors: "info"
      }
      this.logService.createLog(toLog).subscribe(result => {
      })


    })
  };


}