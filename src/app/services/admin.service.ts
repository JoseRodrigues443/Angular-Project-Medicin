import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AdminService {

    private getUrl = 'http://ec2-35-177-186-111.eu-west-2.compute.amazonaws.com:8080/authentication/';

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    getHeaders() {
        let headers = new HttpHeaders({
            'x-access-token':
                this.authenticationService.userInfo.token
        });

        let httpOptions = {
            headers: headers
        };
        return httpOptions;
    }

    getUsers(): Observable<any> {
        return this.http.get<any>(this.getUrl,
            this.getHeaders());
    }


}