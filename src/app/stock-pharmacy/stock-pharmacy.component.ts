import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { PharmacyStock } from '../models/PharmacyStock';
import { PharmacyStockService } from '../services/pharmacy-stock.service';
import { PresentationsService } from '../services/presentations.service';

import * as Chart from 'chart.js';



@Component({
  selector: 'app-stock-pharmacy',
  templateUrl: './stock-pharmacy.component.html',
  styleUrls: ['./stock-pharmacy.component.css']
})
export class StockPharmacyComponent implements OnInit {

  model: any = {};
  response: string;

  isPharmacyIdInserted: boolean = false;
  pharmacyId: string = "Please insert the Pharmacy Code";

  stockList: any[] = [];
  stockListOutOfOrder: any[] = [];
  inStockListOutOfOrder: any[] = [];

  presentationOfStock: any;

  stockToOrder: any;
  presentationToOrderId: any;
  presentationToOrder: any;


  //timeOfDay = ['Morning', 'Afternon', 'Dont care'];


  // Doughnut
  public doughnutChartLabels: string[] = ['Sold Out', 'In Stock'];
  public doughnutChartData: number[] = [350, 450];
  public doughnutChartType: string = 'doughnut';


  preferedTime: string[] = [
    'morning',
    'afternoon',
    'indiferent',
  ];

  constructor(
    private pharmacyStockService: PharmacyStockService,
    private presentationsService: PresentationsService) { }

  ngOnInit() {
    this.presentationToOrder = {
      "Medicamento": {
        "nome": "",
      },
      "Farmaco": {
        "nome": "",
      },
      "forma": "",
      "quantidade": "",
      "concentracao": ""
    }

  }

  insertFarmacyId() {
    this.isPharmacyIdInserted = true;
    this.pharmacyId = this.model.PharmacyId;
    this.pharmacyLoad();
  }


  pharmacyLoad() {
    if (this.isPharmacyIdInserted) {
      this.pharmacyStockService.getStockGeneral(this.pharmacyId).subscribe(toReturn => {
        //alert(JSON.stringify("-->" +toReturn));
        this.stockList = toReturn;
        this.inStockListOutOfOrder = toReturn.filter(obj => obj.quantidadeMinima < obj.quantidade);
        this.pharmacyStockService.getStockOutOfOrder(this.pharmacyId).subscribe(toReturn => {
          this.stockListOutOfOrder = toReturn;
          this.statisticMaker();
        })
      })
    }
  }

  statisticMaker() {
    var allStockCount = this.stockList.length;
    var stockOutOfOrderCount = this.stockListOutOfOrder.length;
    var inStockCount = allStockCount - stockOutOfOrderCount;
    //_________________doughnut
    //this.doughnutChartLabels = ['In Stock', 'Sold Out', 'All Stock'];
    //let tmp = data;
    this.doughnutChartData = [stockOutOfOrderCount, inStockCount];
    this.doughnutChartData = this.doughnutChartData.slice();

  }


  setOrder(stockToOrder, presentationToOrder) {
    this.stockToOrder = stockToOrder;
    this.presentationToOrderId = presentationToOrder;
    this.presentationsService.getPresentationsByIdForStock(this.presentationToOrderId).subscribe(toReturn => {
      console.log("-->" + JSON.stringify(toReturn));
      this.presentationToOrder = toReturn;
    })
  }


  order() {
    // alert(JSON.stringify(this.model));
    this.stockToOrder;
    this.presentationToOrderId;
    if (this.model.preferedTime === "indiferent") {
      this.model.preferedTime = "morning";
    }
    var order = {
      apresentacaoId: this.presentationToOrderId,
      quantidadeEncomendar: this.model.quantity,
      alturaDia: this.model.preferedTime,
      farmacia: this.pharmacyId
    }
    this.pharmacyStockService.order(order).subscribe(toReturn => {
      var tmp =  confirm("Success!!! Se more info (sysadmin)?");
      if (tmp == true) {
        alert(JSON.stringify(toReturn));
        tmp = false;
      } else {

      }
    })
  }


  help() {
    alert("Contact your sysadmin");
  }


  /**
   * 
   * @param minQuantity 
   * @param quantity 
   * @param type 
   */
  percentage(minQuantity, quantity, type) {
    var success = 0, warning = 0, danger = 0;
    var total = quantity;
    if (minQuantity >= quantity) {
      danger = quantity;
      warning = 0;
      success = 0;
    } else if (minQuantity < quantity && 2 * minQuantity > quantity) {
      danger = minQuantity;
      var tmp = quantity - minQuantity;
      warning = tmp;
      success = 0;
    } else if (2 * minQuantity <= quantity) {
      danger = minQuantity;
      var tmp = quantity - minQuantity;
      warning = tmp / 2;
      success = tmp / 2;
    }
    danger = danger == 0 ? 0 : (danger * 100) / total;
    warning = warning == 0 ? 0 : (warning * 100) / total;
    success = success == 0 ? 0 : (success * 100) / total;

    if (type == "danger") {
      return danger + '%';
    } else if (type == "warning") {
      return warning + '%';
    } else if (type == "success") {
      return success + '%';
    }
    return;
  }

  chartClicked() {

  }
}
