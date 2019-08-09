import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import Swal from 'sweetalert2'
import { interval } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

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
  interval:any
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

  constructor(private menuService: MenuService, public angularfs: AngularFirestore) { 
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
    const objTime=obj.time;
    const finalDate= Date.now();
    const secondInterval =(finalDate-objTime)/1000;
    let seconds = Math.trunc(secondInterval % 60);
    let totalMinutes = Math.trunc(secondInterval / 60);
    let minutes = Math.trunc(totalMinutes% 60);
    let hours = Math.trunc(totalMinutes / 60);
    this.interval = setInterval(() => {
    seconds++;
    if (seconds > 59) {
      seconds = 0;
      minutes++
    }
    if (minutes > 59) {
      minutes = 0;
      hours++
    }

    this.timers[obj.id] = {
      hours,
      minutes,
      seconds: seconds
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
  sendStatusReadyToServer(order) {
    this.menuService.updateOrderReadyToServer(order.id)
    this.angularfs.collection("orders").doc(order.id).update({timeIntervalPR:this.timers[order.id]})
    console.log(this.timers[order.id])
    Swal.fire({
      position: 'center',
      type: 'success',
      title: 'Listo para servir',
      html:`<p>Tiempo de Preparación:  ${this.timers[order.id].hours} :  ${this.timers[order.id].minutes} : ${this.timers[order.id].seconds}</p>`,
      showConfirmButton: false,
      timer: 2000
    })
  }
  
  sendStatusDelivery(orderId) {
    this.menuService.updateDelivery(orderId)
  }

}
