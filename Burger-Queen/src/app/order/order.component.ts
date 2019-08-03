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
  finalOrder: any;
  emptyArray: any;
  totalOrder: any;
  show = true;
  totalProducto: number;
  buyerName: string;
  fecha: any;
  dataPedidos = [];
  numeroDePedidos: number;
  todasOrders = []
  constructor(private dataOrder: OrdersService, private menuService: MenuService, private dataName: DataService) {
    this.registrarNumeroDeOrden()
  }

  eliminar(index:any) {
    this.dataOrder.eliminarProducto(index); // la funcion(ingresa el id)
  }


  ngOnInit() {
    this.fecha = new Date();
    this.dataOrder.currentOrders.subscribe(arrOrder => {
      // console.log('Orden lista', arrOrder);
      this.finalOrder = arrOrder;
      // console.log('finalOrder', this.finalOrder);
    })

    this.dataOrder.totalPedidos.subscribe((total: number) => {
      this.totalProducto = total;
      // console.log('totalProducto', this.totalProducto);
    }) // TRABAJANDO CON EL PRECIO TOTAL

    this.dataName.currentBuyerName.subscribe(buyerName => this.buyerName = buyerName)
  }


  registrarNumeroDeOrden() {
    this.menuService.getDataNumeroDePedidos().subscribe(dataPedidos => {
      this.numeroDePedidos = dataPedidos.length + 1;
    })
  }
  
  sendOrder() {
    this.menuService.sendOrderToKitchen({
      numberOrders: this.numeroDePedidos,
      clientName: this.buyerName,
      products: this.finalOrder,
      time: this.fecha,
      status: 'Pendiente',
      total: this.totalProducto
    }).then(elem => this.dataOrder.resetOrder());
    this.buyerName="";
    this.totalProducto=0
    alert("orden enviada")
    // this.menuService.reset()
  }


  newOrder() {
    window.location.reload()
  }
  addNewQuantity(index, cantidadModificada){
    this.dataOrder.acumuladorDePedidos(index, cantidadModificada)
  }
}

