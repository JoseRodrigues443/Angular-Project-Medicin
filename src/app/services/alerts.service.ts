import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AlertsService {

    private alertUrl = 'http://ec2-35-176-41-55.eu-west-2.compute.amazonaws.com:3000/api/warnings';


    private alertDays;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

    setValue(val) {
        this.alertDays = val;
    }

    getValue() {
        return this.alertDays;
    }

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

    getAlerts(): Observable<any> {
        return this.http.get<any>(this.alertUrl,
            this.getHeaders());
    }



}