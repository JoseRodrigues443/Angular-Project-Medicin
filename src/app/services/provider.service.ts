import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class ProviderService {

  //for testing while there is no orders route deployed in aws
//  private ordersURL = 'http://localhost:1337/';

  private ordersURL = 'https://ec2-52-56-128-223.eu-west-2.compute.amazonaws.com:3330/';

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

  /**
   * get all orders
   */
  getOrders(): Observable<any> {
    //return this.http.get<any>(this.ordersURL + 'encomenda', this.getHeaders())
    return this.http.get<any>(this.ordersURL + 'encomenda')
  }

  /**
   * get today orders
   */
  getTodayOrders(): Observable<any> {
    //return this.http.get<any>(this.ordersURL + 'encomendaHoje', this.getHeaders())
    return this.http.get<any>(this.ordersURL + 'encomendaHoje')
  }

  /**
 * get delivered orders
 */
  getDeliveredOrders(): Observable<any> {
    //return this.http.get<any>(this.ordersURL + 'encomendaEnviadas', this.getHeaders())
    return this.http.get<any>(this.ordersURL + 'encomendaEnviadas')
  }

  /**
* get undelivered orders
*/
  getUndeliveredOrders(): Observable<any> {
   // return this.http.get<any>(this.ordersURL + 'encomendasPorEnviar', this.getHeaders())
    return this.http.get<any>(this.ordersURL + 'encomendasPorEnviar')
  }

  getCaminho(): Observable<any> {
    //return this.http.get<any>(this.ordersURL + 'encomendaHoje', this.getHeaders())
    return this.http.get<any>(this.ordersURL + 'planoDia')
  }
}