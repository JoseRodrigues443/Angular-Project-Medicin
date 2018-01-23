import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  loadingTwoFactor = false;
  error = '';
  isTwoFactor: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authenticationService: AuthenticationService, private logService: LogService) { }
  ngOnInit() {
    this.authenticationService.logout();
    this.activatedRoute.params.subscribe(params => {
      if (params['u'] !== undefined) {
        ;
        this.error = 'Your user cannot access medical recipes';
      }
    });
  }

  twoFactor() {

    this.isTwoFactor = true;
    let token = this.model.twoFormInput;
    /**
      * (info) To send to log api so it can be saved on mongoDB(logs DB)
    */
    var toLogInfo = {
      title: "Angular: Login",
      description: "The user" + this.model.email + " has logged in.",
      errors: "info"
    }

        /**
      * (error) To send to log api so it can be saved on mongoDB(logs DB)
    */
    var toLogError = {
      title: "Angular: Login",
      description: "Failed login.",
      errors: "error"
    }

    this.loading = true;
    this.authenticationService.verifyToken(this.model.email,
      token)
      .subscribe(result => {
        this.loading = false;
        if (result === true) {
          this.isTwoFactor = true;
          switch (this.authenticationService.userInfo.userRoles[0]) {
            case 'doctor':
              this.router.navigate(['/doctor']);
              this.logService.createLog(toLogInfo).subscribe(result => {})
              break;
            case 'pharmacist':
              this.router.navigate(['/pharmacist']);
              this.logService.createLog(toLogInfo).subscribe(result => {})
              break;
            case 'patient':
              this.router.navigate(['/patient']);
              this.logService.createLog(toLogInfo).subscribe(result => {})
              break;
            case 'provider':
              this.router.navigate(['/provider']);
              this.logService.createLog(toLogInfo).subscribe(result => {})
              break;
            case 'admin':
              this.router.navigate(['/log']);
              this.logService.createLog(toLogInfo).subscribe(result => {})
    
            default:
              this.router.navigate(['/']);
          }
        } else {
          this.logService.createLog(toLogError).subscribe(result => {})
          this.error = 'Username or password is incorrect';
          
        }
      });
  }

  login(){
    this.authenticationService.login(this.model.email,
      this.model.password)
      .subscribe(result => {
        if(result === true){
          this.isTwoFactor = true;
        }else{
          this.error = 'Username or password is incorrect';
        }
      });
  }





}
