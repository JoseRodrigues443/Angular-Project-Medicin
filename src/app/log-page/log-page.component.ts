import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';

@Component({
  selector: 'app-log-page',
  templateUrl: './log-page.component.html',
  styleUrls: ['./log-page.component.css']
})
export class LogPageComponent implements OnInit {

  logs: any[] = [];
  todayLogs: any[] = [];
  infoLogs: any[] = [];
  errorLogs: any[] = [];
  logsByDate: any[] = [];
  infoLogsByDate: any[] = [];
  errorLogsByDate: any[] = [];

  constructor(
    private logService: LogService
  ) { }

  ngOnInit() {
    this.getLogs();
    this.getTodayLogs();
    this.getErrorLogs();
  }

  /**
   * get all logs
   */
  getLogs() {
    this.logService.getLogs().subscribe(toReturn => {
      this.logs = toReturn;
    })
  }

    /**
   * get today logs
   */
  getInfoLogs() {
    this.logService.getInfoLogs().subscribe(toReturn => {
      this.infoLogs = toReturn;
    })
  }

      /**
   * get today logs
   */
  getErrorLogs() {
    this.logService.getErrorLogs().subscribe(toReturn => {
      this.errorLogs = toReturn;
    })
  }

      /**
   * get today logs
   */
  getTodayLogs() {
    this.logService.getTodayLogs().subscribe(toReturn => {
      this.todayLogs = toReturn;
    })
  }

    /**
   * get logs by date
   */
  getLogsByDate(dateReceived: Date) {
    this.logService.getLogsByDate(dateReceived).subscribe(toReturn => {
      this.logsByDate = toReturn;
    })
  }

      /**
   * get info logs by date
   */
  getInfoLogsByDate(dateReceived: Date) {
    this.logService.getInfoLogsByDate(dateReceived).subscribe(toReturn => {
      this.infoLogsByDate = toReturn;
    })
  }

      /**
   * get error logs by date
   */
  getErrorLogsByDate(dateReceived: Date) {
    this.logService.getErrorLogsByDate(dateReceived).subscribe(toReturn => {
      this.errorLogsByDate = toReturn;
    })
  }


  
}














