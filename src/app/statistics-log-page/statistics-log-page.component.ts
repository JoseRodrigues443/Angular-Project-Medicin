import { Component, OnInit } from '@angular/core';
import { LogService } from '../services/log.service';

import * as Chart from 'chart.js';

@Component({
  selector: 'app-statistics-log-page',
  templateUrl: './statistics-log-page.component.html',
  styleUrls: ['./statistics-log-page.component.css']
})
export class StatisticsLogPageComponent implements OnInit {

  logs: any[] = [];
  todayLogs: any[] = [];
  yesterdayLogs: any[] = [];
  beforeYesterdayLogs: any[] = [];
  logsByDate3: any[] = [];
  logsByDate4: any[] = [];
  logsByDate5: any[] = [];
  logsByDate6: any[] = [];

  errorLogsByDate0: any[] = [];
  errorLogsByDate1: any[] = [];
  errorLogsByDate2: any[] = [];
  errorLogsByDate3: any[] = [];
  errorLogsByDate4: any[] = [];
  errorLogsByDate5: any[] = [];
  errorLogsByDate6: any[] = [];
  errorLogs: any[] = [];

  infoLogsByDate0: any[] = [];
  infoLogsByDate1: any[] = [];
  infoLogsByDate2: any[] = [];
  infoLogsByDate3: any[] = [];
  infoLogsByDate4: any[] = [];
  infoLogsByDate5: any[] = [];
  infoLogsByDate6: any[] = [];
  infoLogs: any[] = [];

  today = new Date();
  yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  beforeYesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 2);
  daysAgoDate3 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 3);
  daysAgoDate4 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 4);
  daysAgoDate5 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 5);
  daysAgoDate6 = new Date(new Date().getTime() - 24 * 60 * 60 * 1000 * 6);


  // Doughnut chart 
  public doughnutChartLabels: string[] = ['Today logs', 'Logs', 'Error Logs', 'Info Logs'];
  public doughnutChartData: any[] = [200, 600, 150, 400];
  public doughnutChartType: string = 'doughnut';


  // Bar chart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['beforeYesterdayDate', 'yesterdayDate', 'todayDate'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;
  public barChartData: any[] = [
    { data: [65, 59, 80], label: 'Daily Logs' },
    { data: [28, 48, 40], label: 'Logs' }
  ];
  public flag: boolean = true;


  // Line Chart
  public lineChartData: Array<any> = [
    { data: [100, 200, 300, 400, 500, 400, 100], label: 'Logs' },
    { data: [10, 20, 30, 40, 50, 40, 10], label: 'Errors' },
    { data: [90, 180, 270, 360, 450, 360, 90], label: 'InfoLogs' }
  ];
  public lineChartLabels: Array<any> = [this.daysAgoDate6.toDateString(), this.daysAgoDate5.toDateString(),
  this.daysAgoDate4.toDateString(), this.daysAgoDate3.toDateString(),
  this.beforeYesterday.toDateString(), this.yesterday.toDateString(), this.today.toDateString()];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // Logs - blue
      backgroundColor: 'rgba(2,2,104,0.2)',
      borderColor: 'rgba(2,2,104,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // Errors - red
      backgroundColor: 'rgba(94, 1, 1,0.2)',
      borderColor: 'rgba(94, 1, 1,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
        { // InfoLogs - green
      backgroundColor: 'rgba28, 53, 28,0.2)',
      borderColor: 'rgba(28, 53, 28,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';


  constructor(
    private logService: LogService
  ) { }

  ngOnInit() {
    this.getLogs();
    this.getTodayLogs();
    this.getYesterdayLogs();
    this.getBeforeYesterdayLogs();
    this.getLogsByDate3(this.daysAgoDate3);
    this.getLogsByDate4(this.daysAgoDate4);
    this.getLogsByDate5(this.daysAgoDate5);
    this.getLogsByDate6(this.daysAgoDate6);

    this.getErrorLogsByDate0(this.today);
    this.getErrorLogsByDate1(this.yesterday);
    this.getErrorLogsByDate2(this.beforeYesterday);
    this.getErrorLogsByDate3(this.daysAgoDate3);
    this.getErrorLogsByDate4(this.daysAgoDate4);
    this.getErrorLogsByDate5(this.daysAgoDate5);
    this.getErrorLogsByDate6(this.daysAgoDate6);
    this.getErrorLogs();

    this.getInfoLogsByDate0(this.today);
    this.getInfoLogsByDate1(this.yesterday);
    this.getInfoLogsByDate2(this.beforeYesterday);
    this.getInfoLogsByDate3(this.daysAgoDate3);
    this.getInfoLogsByDate4(this.daysAgoDate4);
    this.getInfoLogsByDate5(this.daysAgoDate5);
    this.getInfoLogsByDate6(this.daysAgoDate6);
    this.getInfoLogs();
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
   * get all error-logs
   */
  getErrorLogs() {
    this.logService.getErrorLogs().subscribe(toReturn => {
      this.errorLogs = toReturn;
    })
  }

      /**
   * get all info-logs
   */
  getInfoLogs() {
    this.logService.getInfoLogs().subscribe(toReturn => {
      this.infoLogs = toReturn;
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
* get yesterday logs
*/
  getYesterdayLogs() {
    this.logService.getYesterdayLogs().subscribe(toReturn => {
      this.yesterdayLogs = toReturn;
    })
  }

  /**
* get BeforeYesterday logs
*/
  getBeforeYesterdayLogs() {
    this.logService.getBeforeYesterdayLogs().subscribe(toReturn => {
      this.beforeYesterdayLogs = toReturn;
    })
  }

  /**
* get logs by date
*/
  getLogsByDate(receivedDate: Date) {
    this.logService.getLogsByDate(receivedDate).subscribe(toReturn => {
      this.logsByDate4 = toReturn;
    })
  }

  /**
* get logs by date
*/
  getLogsByDate3(receivedDate: Date) {
    this.logService.getLogsByDate(receivedDate).subscribe(toReturn => {
      this.logsByDate3 = toReturn;
    })
  }

  /**
* get logs by date
*/
  getLogsByDate4(receivedDate: Date) {
    this.logService.getLogsByDate(receivedDate).subscribe(toReturn => {
      this.logsByDate4 = toReturn;
    })
  }

  /**
* get logs by date
*/
  getLogsByDate5(receivedDate: Date) {
    this.logService.getLogsByDate(receivedDate).subscribe(toReturn => {
      this.logsByDate5 = toReturn;
    })
  }

  /**
* get logs by date
*/
  getLogsByDate6(receivedDate: Date) {
    this.logService.getLogsByDate(receivedDate).subscribe(toReturn => {
      this.logsByDate6 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate0(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate0 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate1(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate1 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate2(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate2 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate3(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate3 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate4(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate4 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate5(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate5 = toReturn;
    })
  }

  /**
* get Info logs by date
*/
  getInfoLogsByDate6(receivedDate: Date) {
    this.logService.getInfoLogsByDate(receivedDate).subscribe(toReturn => {
      this.infoLogsByDate6 = toReturn;
    })
  }

    /**
* get error logs by date
*/
getErrorLogsByDate0(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate0 = toReturn;
  })
}

/**
* get error logs by date
*/
getErrorLogsByDate1(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate1 = toReturn;
  })
}

/**
* get error logs by date
*/
getErrorLogsByDate2(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate2 = toReturn;
  })
}

/**
* get error logs by date
*/
getErrorLogsByDate3(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate3 = toReturn;
  })
}

/**
* get error logs by date
*/
getErrorLogsByDate4(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate4 = toReturn;
  })
}

/**
* get error logs by date
*/
getErrorLogsByDate5(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate5 = toReturn;
  })
}

/**
* get error logs by date
*/
getErrorLogsByDate6(receivedDate: Date) {
  this.logService.getErrorLogsByDate(receivedDate).subscribe(toReturn => {
    this.errorLogsByDate6 = toReturn;
  })
}

  ///////////////////////////DONUT/////////////
  /**
   * statistcs maker for donut graph
   */
  statisticsMaker() {
    var logs = this.logs.length;
    var todayLogs = this.todayLogs.length;
    var errorLogs = this.errorLogs.length;
    var infoLogs = this.infoLogs.length;

    this.doughnutChartData = [todayLogs, logs, errorLogs, infoLogs];
  }

  /////////////////////////////BAR//////////////////
  /**
 * statistcs maker for bar chart graph
 */
  statisticsBarChartMaker() {
    var logs = this.logs.length;
    var todayLogs = this.todayLogs.length;
    var yesterdayLogs = this.yesterdayLogs.length;
    var beforeYesterdayLogs = this.beforeYesterdayLogs.length;

    this.barChartData = [
      { data: [beforeYesterdayLogs, yesterdayLogs, todayLogs], label: 'Daily Logs' },
      { data: [logs, logs, logs], label: 'Logs' }
    ];
  }

  public updateBarChartLabels() {

    console.log("today:", this.today);
    console.log("yesterday:", this.yesterday);
    console.log("beforeYesterday:", this.beforeYesterday);

    this.barChartLabels = [this.beforeYesterday.toDateString(), this.yesterday.toDateString(), this.today.toDateString()];
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
    this.alterDateOrder();
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  /**
   * this method change the order of date that the user wants to see
   */
  public alterDateOrder() {

    var logs = this.logs.length;
    var todayLogs = this.todayLogs.length;
    var yesterdayLogs = this.yesterdayLogs.length;
    var beforeYesterdayLogs = this.beforeYesterdayLogs.length;

    if (this.flag) {
      this.barChartData = [
        { data: [todayLogs, yesterdayLogs, beforeYesterdayLogs], label: 'Daily Logs' },
        { data: [logs, logs, logs], label: 'Logs' }
      ];

      this.barChartLabels = [this.beforeYesterday.toDateString(), this.yesterday.toDateString(), this.today.toDateString()];
      console.log("BAR CHART LABELS:", this.barChartLabels);
      console.log("FLAG:", this.flag);
      this.flag = false;

    }

    else if (!this.flag) {
      this.barChartData = [
        { data: [beforeYesterdayLogs, yesterdayLogs, todayLogs], label: 'Daily Logs' },
        { data: [logs, logs, logs], label: 'Logs' }
      ];

      this.barChartLabels = [this.today.toDateString(), this.yesterday.toDateString(), this.beforeYesterday.toDateString()];
      console.log("BAR CHART LABELS:", this.barChartLabels);
      console.log("FLAG:", this.flag);
      this.flag = true;
    }
  }


  ///////////////////////////LINE/////////////
  /**
  * statistcs maker for line chart graph
  */
  statisticsLineChartMaker() {

    this.lineChartData = [
      {
        data: [this.logsByDate6.length, this.logsByDate5.length, this.logsByDate4.length, this.logsByDate3.length,
        this.beforeYesterdayLogs.length, this.yesterdayLogs.length, this.todayLogs.length], label: 'Logs'
      },
      {
        data: [this.errorLogsByDate6.length, this.errorLogsByDate5.length, this.errorLogsByDate4.length, this.errorLogsByDate3.length,
        this.errorLogsByDate2.length, this.errorLogsByDate1.length, this.errorLogsByDate0.length], label: 'Errors'
      },
      {
        data: [this.infoLogsByDate6.length, this.infoLogsByDate5.length, this.infoLogsByDate4.length, this.infoLogsByDate3.length,
        this.infoLogsByDate2.length, this.infoLogsByDate1.length, this.infoLogsByDate0.length], label: 'InfoLogs'
      }
    ];
  }

  // events
  public chartClicked2(e: any): void {
    console.log(e);
  }



}