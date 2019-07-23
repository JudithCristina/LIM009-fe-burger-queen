import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  finalOrder:any;
  emptyArray:any;
  totalOrder:any;
  show = true
  totalProducto: number;

  constructor(private dataOrder: OrdersService) { }
   eliminar(id: any){
    this.dataOrder.eliminarProducto(id); //lafuncion(ingresa el id)
  }

  ngOnInit() {  
    this.dataOrder.currentOrders.subscribe(arrOrder => {
      // console.log('Orden lista', arrOrder);
      this.finalOrder = arrOrder;
      console.log('finalOrder', this.finalOrder);
    })

      this.dataOrder.totalPedidos.subscribe((total:number) => {
        this.totalProducto = total;
        console.log('totalProducto', this.totalProducto);
      }) // TRABAJANDO CON EL PRECIO TOTAL
  }
}
