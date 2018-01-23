import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Presentation } from '../models/presentation';

@Injectable()
export class PresentationsService {

  private presentationsUrl = 'https://ec2-35-177-186-111.eu-west-2.compute.amazonaws.com:4040/apresentacao';
  private commentUrl = "https://ec2-35-176-41-55.eu-west-2.compute.amazonaws.com:4040/comentario/";

  constructor(private http: HttpClient) { }

  getPresentations(): Observable<Presentation[]> {
    return this.http.get<Presentation[]>(this.presentationsUrl)
  }
  getPresentationsById(presentationId): Observable<any> {
    return this.http.get<any>(this.presentationsUrl + presentationId)
  }

  getPresentationsByIdForStock(presentationId): Observable<any> {
    return this.http.get<any>(this.presentationsUrl + '/' + presentationId)
  }
  comment(presentationId): Observable<any> {
    return this.http.get<any>(this.commentUrl)
  }
  commentTo(presentationId): Observable<any> {
    return this.http.get<any>(this.commentUrl)  //change to post
  }
}
