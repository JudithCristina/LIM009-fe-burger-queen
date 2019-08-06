import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  ordersPending : any;
  ordersReadyToServe : any;
  ordersDelivery: any;
  
 
  showActivePending: boolean =true;
  showActiveReadyToServe:boolean = false
  showActiveDelivery:boolean = false
  showPending: boolean = true;
  showReadyToServe: boolean = false;
  showDelivery: boolean = false;
  ordersTotal:any
  timeSeconds: number = 0; 
  timeMinutos: number =0;
  interval; 


  startTimer() { this.interval = setInterval(() => { if (this.timeSeconds===60){this.timeSeconds=0;this.timeMinutos++ }else {this.timeSeconds++}},1000) } 
  //pauseTimer() { clearInterval(this.interval); } 
 
  openPending() {
    this.showPending = true;
    this.showReadyToServe = false;
    this.showDelivery = false;
    this.showActivePending = true
    this.showActiveReadyToServe = false;
    this.showActiveDelivery = false;
    this.ordersPending
  }

  openReadyToServe() {
    this.showPending = false;
    this.showReadyToServe = true;
    this.showDelivery = false;
    this.showActivePending = false;
    this.showActiveReadyToServe = true;
    this.showActiveDelivery = false;
    this.ordersReadyToServe
  }

  openDelivery() {
    this.showPending = false;
    this.showReadyToServe = false;
    this.showDelivery = true;
    this.showActivePending = false;
    this.showActiveReadyToServe = false;
    this.showActiveDelivery = true;
    this.ordersDelivery
  }



  constructor(private menuService: MenuService) { 
    this.filterOrderPending();
    this.filterOrderReadyToServe();
    this.filterOrderDelivery();
    this.startTimer()
  }

  filterOrderPending() {
    this.menuService.getTotalOrders().subscribe(dataPedidos => {
      this.ordersPending = dataPedidos.filter((ele:any) => ele.status ==='Pendiente' )
    })
  }
  filterOrderReadyToServe(){
    this.menuService.getTotalOrders().subscribe(dataPedidos => {
      this.ordersReadyToServe= dataPedidos.filter((ele:any) => ele.status === 'Listo para servir' )
    })
  }
  filterOrderDelivery(){
    this.menuService.getTotalOrders().subscribe(dataPedidos => {
      this.ordersDelivery= dataPedidos.filter((ele:any) => ele.status === 'Entregado' )
      console.log(this.ordersReadyToServe)
    })
  }
  ngOnInit() {
    this.menuService.listOrders.subscribe((total: any) => {
      this.ordersTotal = total;
      // console.log('totalProducto', this.totalProducto);
    })
  }
  sendStatusReadyToServer(orderId) {
    this.menuService.updateOrderReadyToServer(orderId)
  }
  sendStatusDelivery(orderId) {
    this.menuService.updateDelivery(orderId)
  }

}
