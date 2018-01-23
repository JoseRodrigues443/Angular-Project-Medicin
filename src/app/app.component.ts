import { Component, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user';



declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Electronic Drug Prescription';
  lat: number = 51.486855;
  lng: number = 5.765623;
  subscriptionAuth: Subscription;
  userInfo: User;
  userName: string;
  constructor(
    private authenticationService: AuthenticationService,
    private cdr: ChangeDetectorRef) { }
  ngOnInit() {
    this.userInfo = this.authenticationService.userInfo;
    this.subscriptionAuth =
      this.authenticationService.authentication.subscribe((userInfo) => {
        this.userName = localStorage.getItem("username");
        this.userInfo = userInfo;
        this.cdr.detectChanges();
      });
  }
  ngOnDestroy() {
    this.subscriptionAuth.unsubscribe();
  }
}