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
  ordersId : any
  pending :any;
 
  showActivePending: boolean =true;
  showActiveReadyToServe:boolean = false
  showActiveDelivery:boolean = false
  showPending: boolean = true;
  showReadyToServe: boolean = false;
  showDelivery: boolean = false;
  ordersTotal:any
  timers = {};

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
  }
  //pauseTimer() { clearInterval(this.interval); } 
  filterOrderPending() {
    this.menuService.getTotalOrders().subscribe(dataPedidos => {
      this.ordersPending = dataPedidos.filter((ele:any) => ele.status ==='Pendiente' )
      console.log(this.ordersPending)
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
    })
  }


  timeIntervalo(obj){
    const objTime=obj.time
    const finalDate= Date.now()
    let interval
    const secondInterval =(finalDate-objTime)/1000
    let seconds = Math.trunc(secondInterval % 60);
    let totalMinutes = Math.trunc(secondInterval / 60);
    let minutes = Math.trunc(totalMinutes% 60);
    let hours = Math.trunc(totalMinutes / 60);
  interval = setInterval(() => {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
    }
    if (minutes > 59) {
      minutes = 0;
    }

    this.timers[obj.id] = {
      hours,
      minutes,
      seconds: seconds,
    };
  }, 1000);
  }

  ngOnInit() {
    this.menuService.listOrders.subscribe((total: any) => {
      this.ordersTotal = total;
      // console.log('totalProducto', this.totalProducto);
    })

    this.menuService.getTotalOrders().subscribe(dataPedidos => {
      this.ordersId= dataPedidos
      this.pending = this.ordersId.filter((ele:any) => ele.status === 'Pendiente' )
    
    this.pending.forEach(order=>{
      this.timeIntervalo(order)
      console.log(order);
  })
    })
    
}
  sendStatusReadyToServer(orderId) {
    this.menuService.updateOrderReadyToServer(orderId)
  }
  sendStatusDelivery(orderId) {
    this.menuService.updateDelivery(orderId)
  }

}
