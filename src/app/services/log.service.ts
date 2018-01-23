import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class LogService {

  //for testing while there is no logs route deployed in aws
  // private logsURL = 'http://localhost:1337/';

  private logsURL = 'https://ec2-35-177-186-111.eu-west-2.compute.amazonaws.com:1338/';

  constructor(private http: HttpClient) { }

  //constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  // getHeaders() {
  //   let headers = new HttpHeaders({
  //     'x-access-token':
  //     this.authenticationService.userInfo.token
  //   });

  //   let httpOptions = {
  //     headers: headers
  //   };
  //   return httpOptions;
  // }

  /**
   * get all logs
   */
  getLogs(): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'log', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'log');
  }

    /**
   * get all info logs
   */
  getInfoLogs(): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'infoLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'infoLogs');
  }

    /**
   * get all error logs
   */
  getErrorLogs(): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'errorLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'errorLogs');
  }

  /**
   * get today logs
  */
  getTodayLogs(): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'todayLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'todayLogs');
  }

  /**
   * create logs
   * @param message 
   */
  createLog(requestBody): Observable<any> {
    //return this.http.post(this.logsURL + 'log', JSON.parse(requestBody), this.getHeaders());
    return this.http.post(this.logsURL + 'log', requestBody);
  }

    /**
   * get yesterday logs
  */
  getYesterdayLogs(): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'yesterdayLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'yesterdayLogs');
  }

    /**
   * get before yesterday logs
  */
  getBeforeYesterdayLogs(): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'beforeYesterdayLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'beforeYesterdayLogs');
  }

    /**
   * get LogsByDate
  */
  getLogsByDate(dateReceived: Date): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'todayLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'logsByDate/' + dateReceived);
  }

      /**
   * get LogsByDate
  */
  getInfoLogsByDate(dateReceived: Date): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'todayLogs', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'infologsByDate/' + dateReceived);
  }

      /**
   * get LogsByDate
  */
  getErrorLogsByDate(dateReceived: Date): Observable<any> {
    //return this.http.get<any>(this.logsURL + 'errorlogsByDate', this.getHeaders());
    return this.http.get<any>(this.logsURL + 'errorlogsByDate/' + dateReceived);
  }


}