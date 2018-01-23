import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/user';

class Token {
  token: string
};

@Injectable()
export class AuthenticationService {
  /* private authUrl = 'http://localhost:3000/api/user/login'; */
  private authUrl = 'http://ec2-35-177-186-111.eu-west-2.compute.amazonaws.com:8080';
  public userInfo: User;
  authentication: Subject<User> = new Subject<User>();

  constructor(private http: HttpClient) {
    //     CORRECTED BY 1150710, because of the && PARSE the angular didnt start
    //this.userInfo = localStorage.userInfo && JSON.parse(localStorage.userInfo);
    this.userInfo = localStorage.userInfo;
  }

  verifyToken(username: string, token: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.post<Token>(this.authUrl + "/authentication/twofactor", {
        username: username,
        token: token
      }).subscribe(data => {
        console.log(data);
        if (data.token) {
          
          const tokenDecoded = jwt_decode(data.token);
          this.userInfo = {
            token: data.token,
            tokenExp: tokenDecoded.exp,
            userRoles: tokenDecoded.userRoles,
            userId: tokenDecoded.userId,
            currentTwoFactorToken: "0",
          }
          localStorage.userInfo = JSON.stringify(this.userInfo);

          this.authentication.next(this.userInfo);
          observer.next(true);
        } else {
          this.authentication.next(this.userInfo);
          observer.next(false);
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          this.authentication.next(this.userInfo);
          observer.next(false);
        });
    });
  }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      this.http.post<Token>(this.authUrl + "/authentication/authenticate", {
        username: username,
        password: password
      }).subscribe(data => {
        if(data['success'] == true){
          localStorage.username = username;
          observer.next(true);
        }
      },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Client-side error occured.");
          } else {
            console.log("Server-side error occured.");
          }
          console.log(err);
          this.authentication.next(this.userInfo);
          observer.next(false);
        });
    });
  }

  logout() {
    this.userInfo = null;
    localStorage.removeItem('userInfo');
    this.authentication.next(this.userInfo);
  }

}
