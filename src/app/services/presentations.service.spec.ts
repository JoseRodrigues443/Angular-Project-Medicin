import { TestBed, inject } from '@angular/core/testing';

import { PresentationsService } from './presentations.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

describe('PresentationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PresentationsService, Http, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([PresentationsService], (service: PresentationsService) => {
    expect(service).toBeTruthy();
  }));

  it(' service.getPresentations should make http request', inject([PresentationsService], (service: PresentationsService) => {
    expect(service.getPresentations()).toBeTruthy();
  }));
  
  it(' service.getPresentations should make http request', inject([PresentationsService], (service: PresentationsService) => {
    expect(service.getPresentationsById("")).toBeTruthy();
  }));
  
  it(' service.getPresentations should make http request', inject([PresentationsService], (service: PresentationsService) => {
    expect(service.getPresentationsByIdForStock("")).toBeTruthy();
  }));
  
});
