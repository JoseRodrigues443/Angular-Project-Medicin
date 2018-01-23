import { TestBed, inject } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { LogService } from './log.service';

describe('LogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogService,Http, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([LogService], (service: LogService) => {
    expect(service.getLogs()).toBeTruthy();
  }));

  
  it('should be created', inject([LogService], (service: LogService) => {
    expect(service.getInfoLogs()).toBeTruthy();
  }));

  it('should be created', inject([LogService], (service: LogService) => {
    expect(service.getErrorLogs()).toBeTruthy();
  }));

  it('should be created', inject([LogService], (service: LogService) => {
    expect(service.getTodayLogs()).toBeTruthy();
  }));


  it('should be created', inject([LogService], (service: LogService) => {
    expect(service.getYesterdayLogs()).toBeTruthy();
  }));



  it('should be created', inject([LogService], (service: LogService) => {
    expect(service).toBeTruthy();
  }));
});
