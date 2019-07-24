import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { MenuService } from '../services/menu.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  finalOrder:any;
  emptyArray:any;
  totalOrder:any;
  show = true;
  totalProducto: number;
  buyerName:string;

  constructor(private dataOrder: OrdersService, private menuService: MenuService, private dataName: DataService) { }
  
  eliminar(id: any){
    this.dataOrder.eliminarProducto(id); // la funcion(ingresa el id)
  }

  ngOnInit() {  
    this.dataOrder.currentOrders.subscribe(arrOrder => {
      // console.log('Orden lista', arrOrder);
      this.finalOrder = arrOrder;
      // console.log('finalOrder', this.finalOrder);
    })

    this.dataOrder.totalPedidos.subscribe((total:number) => {
      this.totalProducto = total;
      // console.log('totalProducto', this.totalProducto);
    }) // TRABAJANDO CON EL PRECIO TOTAL

    this.dataName.currentBuyerName.subscribe(buyerName => this.buyerName = buyerName)
  }

  sendOrder() {
    this.menuService.sendOrderToKitchen({
      clientName: this.buyerName,
      products: this.finalOrder,
      time: new Date(),
      status: 'Pendiente',
      total: this.totalProducto
    });
  }

  
}
