import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { User } from '../models/user';

@Injectable()
export class RegisterService {

  private authUrl = 'http://ec2-35-177-186-111.eu-west-2.compute.amazonaws.com:8080/authentication/';
  //private authUrl= 'http://localhost:8080/authentication'
  constructor(private http: HttpClient) { }

  create(name: string, email: string, password: string) {
    return this.http.post(this.authUrl, { username: name, email: email, password: password, roles: ['patient']}).map((response: Response) => response);
  }

  
}
