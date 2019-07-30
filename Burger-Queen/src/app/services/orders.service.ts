import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { ArrayType } from '@angular/compiler';
// import { filter } from 'rxjs/operators';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class OrdersService {
  arrProduct = [];
  filteredArrProduct: any
  arrCalculate: number;

  public ordersSource = new BehaviorSubject([]);
  currentOrders = this.ordersSource.asObservable();

  public totalData = new BehaviorSubject(0);
  totalPedidos = this.totalData.asObservable();


  addProduct(product) {
    if (this.arrProduct.length === 0) {
      this.arrProduct.push(product);
    } else {
      this.filteredArrProduct = this.arrProduct.filter(elem => {
        // console.log('elem', elem);
        return (elem.name !== product.name  || ( elem.name === product.name && product.additional === "con huevo" ) || (elem.name === product.name && product.additional === "con queso"  ));
      });
      if (this.arrProduct.length > this.filteredArrProduct.length) {
        for (let i = 0; i < this.arrProduct.length; i++) {
          if (this.arrProduct[i].name === product.name) {
            this.arrProduct[i]['quantity'] = this.arrProduct[i]['quantity'] + 1;
            this.arrProduct[i].priceTotal = this.arrProduct[i]['quantity'] * this.arrProduct[i]['price'];
          }
        };
      } else {
          if (product.additional === "con queso" || product.additional === "con huevo" ) {
            product.price= product.price + 1;
            product.priceTotal = product['quantity'] * product.price;
          }
          this.arrProduct.push(product);
        };
    };
    // console.log('arrproduct', this.arrProduct);
    this.ordersSource.next(this.arrProduct);
    this.totalDePedidos();

  }



  totalDePedidos() {
    this.arrCalculate = this.arrProduct.reduce((acum, obj) => {
      return acum + obj.priceTotal;
    }, 0);
    this.totalData.next(this.arrCalculate);
  }

  addTypeHamburguers(type: any) {
    for (let i = 0; i < this.arrProduct.length; i++) {
      this.arrProduct[i].typeOfBurguer = type
    }
    this.ordersSource.next(this.arrProduct)
  }
  eliminarProducto(id) {
    for (let i = 0; i < this.arrProduct.length; i++) {
      if (this.arrProduct[i].id === id) {
        this.arrProduct[i].quantity = this.arrProduct[i].quantity - 1;
        this.arrProduct[i].priceTotal = this.arrProduct[i].quantity * this.arrProduct[i].price
      }
    }

    this.arrProduct = this.arrProduct.filter(objArrOrden => {
      return objArrOrden.quantity !== 0
    })

    this.ordersSource.next(this.arrProduct);
    this.totalDePedidos()
  }

}
