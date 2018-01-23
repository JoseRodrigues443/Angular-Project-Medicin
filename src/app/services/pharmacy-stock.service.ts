import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Presentation } from '../models/presentation';

@Injectable()
export class PharmacyStockService {

  private stockUrl = 'https://ec2-52-56-128-223.eu-west-2.compute.amazonaws.com:3333/';


  constructor(private http: HttpClient) { }


  getStockGeneral(pharmacyId): Observable<any[]> {
    return this.http.get<any[]>(this.stockUrl + 'stock/' + pharmacyId)
  }

  getStockOutOfOrder(pharmacyId): Observable<any[]> {
    return this.http.get<any[]>(this.stockUrl + 'esgotado/' + pharmacyId)
  }

  order(requestBody) {
    return this.http.post(this.stockUrl + 'encomenda/', requestBody);
  }

}
