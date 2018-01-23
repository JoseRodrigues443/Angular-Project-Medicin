import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../../services/provider.service';

@Component({
  selector: 'app-dashboard-provider',
  templateUrl: './dashboard-provider.component.html',
  styleUrls: ['./dashboard-provider.component.css']
})
export class DashboardProviderComponent implements OnInit {

  orders:any;

  //delivered orders counter
  months: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  //Number of Last Year's Deliveries
  lastYearDelivers:number =0;

  constructor(private providerService: ProviderService) { }

  ngOnInit() {
    this.providerService.getOrders().subscribe(orders => {
        this.orders = orders;
        this.deliveredOrdersPerMonth();
    })
  }

  //Delivered Orders Per Month
  deliveredOrdersPerMonth(){
    var date = new Date();
    var year = date.getFullYear();
    var month;
    for (var i = 0; i < this.orders.length; i++) {
      month = this.orders[i].updatedAt.split("-");
      if(this.orders[i].enviada){
        if(month[0]==year){
          this.months[parseInt(month[1]) - 1]++;
        }
        if(month[0]==year-1){
          this.lastYearDelivers++;
        }
      }
      
    }
    let data = [this.months[0], this.months[1], this.months[2], this.months[3], this.months[4], this.months[5],
    this.months[6], this.months[7], this.months[8], this.months[9], this.months[10], this.months[11]];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    this.barChartData.slice();
  }

 
  //Delivered Orders per Month Graphic
  public barChartOptions: any = {
    maintainAspectRatio: false,
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
    {
      data: [], label: 'Number of Delivered Orders'
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public lineChartColors: Array<any> = [
    { // Logs - blue
      backgroundColor: 'rgba(255, 146, 5,0.7)',
      borderColor: 'rgba(0, 0, 0,1)',
      pointBackgroundColor: 'rgba(255, 146, 5,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(255, 146, 5,0.8)'
    }
  ];
}
