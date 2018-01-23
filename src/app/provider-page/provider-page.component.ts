import { Component, OnInit, ViewChild } from '@angular/core';
import { ProviderService } from '../services/provider.service';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { LogService } from '../services/log.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-provider-page',
  templateUrl: './provider-page.component.html',
  styleUrls: ['./provider-page.component.css']
})
export class ProviderPageComponent implements OnInit {

  orders: any[] = [];
  todayOrders: any[] = [];
  dispatchedOrders: any[] = [];
  notYetDispatchedOrders: any[] = [];

  //test path to draw polyline in map
  private coords = [{ lat: 41.1459832, lng: -8.612322 }, { lat: 41.1460434, lng: -8.6127408 }, { lat: 41.1459264, lng: -8.6120155 }, { lat: 41.1460434, lng: -8.6127408 }, { lat: 41.1459264, lng: -8.6120155 }, { lat: 41.1459932, lng: -8.6122147 }, { lat: 41.1460303, lng: -8.6122081 }, { lat: 41.1460915, lng: -8.6122068 }, { lat: 41.1471763, lng: -8.6121861 }, { lat: 41.1471899, lng: -8.6122153 }, { lat: 41.1475478, lng: -8.6133682 }, { lat: 41.1479536, lng: -8.6131662 }, { lat: 41.148042, lng: -8.6131914 }, { lat: 41.1479536, lng: -8.6131662 }, { lat: 41.1475478, lng: -8.6133682 }, { lat: 41.1476349, lng: -8.6137484 }, { lat: 41.147714, lng: -8.6140459 }, { lat: 41.1478651, lng: -8.6145055 }, { lat: 41.1477861, lng: -8.6145526 }, { lat: 41.1476768, lng: -8.6146178 }, { lat: 41.1473299, lng: -8.6148959 }, { lat: 41.1479694, lng: -8.6147468 }, { lat: 41.1473299, lng: -8.6148959 }, { lat: 41.1476768, lng: -8.6146178 }, { lat: 41.1477861, lng: -8.6145526 }, { lat: 41.1478651, lng: -8.6145055 }, { lat: 41.1482599, lng: -8.614397 }, { lat: 41.1483296, lng: -8.6143805 }, { lat: 41.1483742, lng: -8.61437 }, { lat: 41.148557, lng: -8.6143324 }, { lat: 41.1486948, lng: -8.6143119 }, { lat: 41.1499575, lng: -8.6140445 }, { lat: 41.1501374, lng: -8.6133057 }, { lat: 41.1500253, lng: -8.6131721 }, { lat: 41.1501374, lng: -8.6133057 }, { lat: 41.1500253, lng: -8.6131721 }, { lat: 41.1499789, lng: -8.6131423 }, { lat: 41.1499804, lng: -8.6130795 }, { lat: 41.1500295, lng: -8.6129916 }, { lat: 41.1500749, lng: -8.6129123 }, { lat: 41.1501064, lng: -8.6128015 }, { lat: 41.1502687, lng: -8.6120989 }, { lat: 41.1504818, lng: -8.6111479 }, { lat: 41.1505161, lng: -8.6110068 }, { lat: 41.1505329, lng: -8.6109625 }, { lat: 41.1505531, lng: -8.61093 }, { lat: 41.1505749, lng: -8.6109002 }, { lat: 41.1506096, lng: -8.6108667 }, { lat: 41.1504917, lng: -8.6108517 }, { lat: 41.1504437, lng: -8.6108479 }, { lat: 41.1503868, lng: -8.6108578 }, { lat: 41.1503313, lng: -8.6108772 }, { lat: 41.1500468, lng: -8.6110969 }, { lat: 41.1499902, lng: -8.6111388 }, { lat: 41.1498841, lng: -8.6112048 }, { lat: 41.1498242, lng: -8.611227 }, { lat: 41.1497737, lng: -8.6112468 }, { lat: 41.1497196, lng: -8.6112464 }, { lat: 41.1494225, lng: -8.6112132 }, { lat: 41.1492866, lng: -8.6111998 }, { lat: 41.1492796, lng: -8.6111402 }, { lat: 41.1492667, lng: -8.6110294 }, { lat: 41.1492201, lng: -8.610629 }, { lat: 41.1492072, lng: -8.6105186 }, { lat: 41.1491992, lng: -8.6104496 }, { lat: 41.1495666, lng: -8.6102387 }, { lat: 41.1496493, lng: -8.6102157 }, { lat: 41.1497297, lng: -8.6102062 }, { lat: 41.1498128, lng: -8.6102115 }, { lat: 41.1499034, lng: -8.610236 }, { lat: 41.1502996, lng: -8.6103431 }, { lat: 41.1503332, lng: -8.6103516 }, { lat: 41.1504258, lng: -8.610337 }, { lat: 41.1505245, lng: -8.6103033 }, { lat: 41.150606, lng: -8.6102434 }, { lat: 41.150769, lng: -8.6100993 }, { lat: 41.1508997, lng: -8.6099839 }, { lat: 41.1508241, lng: -8.6099602 }, { lat: 41.1507614, lng: -8.6099174 }, { lat: 41.1507114, lng: -8.6098399 }, { lat: 41.1506648, lng: -8.6096425 }, { lat: 41.1506367, lng: -8.6095236 }, { lat: 41.1504849, lng: -8.6089109 }, { lat: 41.1513431, lng: -8.6084882 }, { lat: 41.1510073, lng: -8.6085049 }, { lat: 41.1506094, lng: -8.608545 }, { lat: 41.1510073, lng: -8.6085049 }, { lat: 41.1513431, lng: -8.6084882 }, { lat: 41.1504849, lng: -8.6089109 }, { lat: 41.1502271, lng: -8.6077498 }, { lat: 41.1502098, lng: -8.607672 }, { lat: 41.1501294, lng: -8.6073101 }, { lat: 41.1501006, lng: -8.6071805 }, { lat: 41.1500698, lng: -8.6070404 }, { lat: 41.1500985, lng: -8.6067219 }, { lat: 41.149924, lng: -8.6063779 }, { lat: 41.149847, lng: -8.6064171 }, { lat: 41.1486095, lng: -8.6074837 }, { lat: 41.1486163, lng: -8.6070435 }, { lat: 41.1485299, lng: -8.6070875 }, { lat: 41.1483352, lng: -8.6063934 }, { lat: 41.1483178, lng: -8.6063294 }, { lat: 41.1481378, lng: -8.6063979 }, { lat: 41.147981, lng: -8.606457 }, { lat: 41.1474097, lng: -8.6066578 }, { lat: 41.1470287, lng: -8.6068215 }, { lat: 41.1461841, lng: -8.6071119 }, { lat: 41.1471957, lng: -8.6068158 }, { lat: 41.1461841, lng: -8.6071119 }, { lat: 41.1470287, lng: -8.6068215 }, { lat: 41.1470398, lng: -8.6068715 }, { lat: 41.1470471, lng: -8.6069096 }, { lat: 41.1472451, lng: -8.6079412 }, { lat: 41.1472652, lng: -8.6080461 }, { lat: 41.1472781, lng: -8.60811 }, { lat: 41.1473934, lng: -8.6086529 }, { lat: 41.1474864, lng: -8.6085976 }, { lat: 41.1483508, lng: -8.6079767 }, { lat: 41.1477825, lng: -8.6084215 }, { lat: 41.1481676, lng: -8.6081967 }, { lat: 41.1482742, lng: -8.6081345 }, { lat: 41.1485024, lng: -8.6079991 }, { lat: 41.1487047, lng: -8.6078921 }, { lat: 41.1487614, lng: -8.6078621 }, { lat: 41.148795, lng: -8.6079898 }, { lat: 41.1488477, lng: -8.6081896 }, { lat: 41.1488522, lng: -8.6082067 }, { lat: 41.1489249, lng: -8.6084542 }, { lat: 41.1486363, lng: -8.6078517 }, { lat: 41.1491352, lng: -8.6088019 }, { lat: 41.1491223, lng: -8.6091259 }, { lat: 41.1491423, lng: -8.609231 }, { lat: 41.1491495, lng: -8.6093565 }, { lat: 41.1491375, lng: -8.6094872 }, { lat: 41.1491623, lng: -8.6094912 }, { lat: 41.1492013, lng: -8.6094974 }, { lat: 41.1492167, lng: -8.6094999 }, { lat: 41.1493758, lng: -8.6095168 }, { lat: 41.1494714, lng: -8.6095185 }, { lat: 41.1496437, lng: -8.6095168 }, { lat: 41.1498231, lng: -8.6094945 }, { lat: 41.1500752, lng: -8.6094397 }, { lat: 41.1501003, lng: -8.6094343 }, { lat: 41.1501627, lng: -8.6094208 }, { lat: 41.1501979, lng: -8.6093946 }, { lat: 41.1493083, lng: -8.6094578 }, { lat: 41.1501979, lng: -8.6093946 }, { lat: 41.1501627, lng: -8.6094208 }, { lat: 41.1501003, lng: -8.6094343 }, { lat: 41.1500752, lng: -8.6094397 }, { lat: 41.1498231, lng: -8.6094945 }, { lat: 41.1496437, lng: -8.6095168 }, { lat: 41.1494714, lng: -8.6095185 }, { lat: 41.1493758, lng: -8.6095168 }, { lat: 41.1492167, lng: -8.6094999 }, { lat: 41.1492013, lng: -8.6094974 }, { lat: 41.1491623, lng: -8.6094912 }, { lat: 41.1491375, lng: -8.6094872 }, { lat: 41.1491238, lng: -8.6096573 }, { lat: 41.1491712, lng: -8.6101225 }, { lat: 41.1491616, lng: -8.610279 }, { lat: 41.1491992, lng: -8.6104496 }, { lat: 41.1490114, lng: -8.6105434 }, { lat: 41.14882, lng: -8.6106244 }, { lat: 41.148611, lng: -8.6107017 }, { lat: 41.1482939, lng: -8.6108052 }, { lat: 41.1478401, lng: -8.6109253 }, { lat: 41.1478598, lng: -8.6111024 }, { lat: 41.1478797, lng: -8.6112813 }, { lat: 41.1470677, lng: -8.6114384 }, { lat: 41.1468845, lng: -8.6114757 }, { lat: 41.1467033, lng: -8.6115054 }, { lat: 41.1462633, lng: -8.6115864 }, { lat: 41.1460434, lng: -8.6116329 }, { lat: 41.1460414, lng: -8.611684 }, { lat: 41.1460319, lng: -8.6117878 }, { lat: 41.1459998, lng: -8.6121369 }, { lat: 41.1459932, lng: -8.6122147 }, { lat: 41.1459264, lng: -8.6120155 }, { lat: 41.1460434, lng: -8.6127408 }, { lat: 41.1459832, lng: -8.612322 }]
  private initialX;
  private initialY;

  @ViewChild('map') map: AgmMap;

  constructor(
    private providerService: ProviderService,
    private logService: LogService, private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    var midX = 0, midY = 0;

    for (var i = 0; i < this.coords.length; i++) {
      midX += this.coords[i]['lat'];
      midY += this.coords[i]['lng'];

    }


    this.initialX = midX / this.coords.length;
    this.initialY = midY / this.coords.length;


    this.getOrders();
    this.getTodayOrders();
    this.getDeliveredOrders();
    this.getUndeliveredOrders();
    this.resizeMap();
  }

  resizeMap() {
    this.map.triggerResize();
  }

  getPath() {
    this.providerService.getCaminho().subscribe(caminho => {


      caminho.split('lat').join('"lat"');
      caminho.split('lng').join('"lng"');


      this.coords = JSON.parse(caminho);
    })
  }

  getOrders() {

    /**
 * (info) To send to log api so it can be saved on mongoDB(logs DB)
 */
    var toLog = {
      title: "Angular: Orders",
      description: "The user " + this.authenticationService.userInfo.userId + " has visited orders list",
      errors: "info"
    }
    this.logService.createLog(toLog).subscribe(result => {
    })


    this.providerService.getOrders().subscribe(toReturn => {
      this.orders = toReturn;
    })
  }

  getTodayOrders() {
    this.providerService.getTodayOrders().subscribe(toReturn => {
      this.todayOrders = toReturn;
    })
  }

  getDeliveredOrders() {
    this.providerService.getDeliveredOrders().subscribe(toReturn => {
      this.dispatchedOrders = toReturn;
    })
  }

  getUndeliveredOrders() {
    this.providerService.getUndeliveredOrders().subscribe(toReturn => {
      this.notYetDispatchedOrders = toReturn;
    })
  }

}
