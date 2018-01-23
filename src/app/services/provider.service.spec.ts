import { TestBed, inject } from '@angular/core/testing';

import { PresentationsService } from './presentations.service';
import { Http, BaseRequestOptions } from '@angular/http';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';


import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ProviderService } from './provider.service';

describe('ProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProviderService, Http, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([ProviderService], (service: ProviderService) => {
    expect(service).toBeTruthy();
  }));

  it(' service.getTodayOrders should be created', inject([ProviderService], (service: ProviderService) => {
    expect(service.getTodayOrders()).toBeTruthy();
  }));

  it('service.getDeliveredOrders should be created', inject([ProviderService], (service: ProviderService) => {
    expect(service.getDeliveredOrders()).toBeTruthy();
  }));

  it(' service.getUndeliveredOrders should be created', inject([ProviderService], (service: ProviderService) => {
    expect(service.getUndeliveredOrders()).toBeTruthy();
  }));

});
