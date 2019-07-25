import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Item } from '../models/Item';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-lunch-menu',
  templateUrl: './lunch-menu.component.html',
  styleUrls: ['./lunch-menu.component.css']
})
export class LunchMenuComponent implements OnInit {

  hamburguesas: Item[];
  bebidas: Item[];
  acompanamientos: Item[];
  adicionales: Item[];

  itemsLunchMenu: Item[];
  itemLunch:string;
  productAdded:object;

  addItemToMenuService(itemLunchID) {
    for (let i = 0; i < this.itemsLunchMenu.length; i++) {
      if (this.itemsLunchMenu[i].id === itemLunchID) {
        this.productAdded = {
          id: itemLunchID,
          name: this.itemsLunchMenu[i].name,
          typeOfBurger: '',
          extras: '',
          quantity: 1,
          price: this.itemsLunchMenu[i].price,
          priceTotal: this.itemsLunchMenu[i].price}
      }
    }
    this.orderService.addProduct(this.productAdded)
  }

  constructor(private menuService: MenuService, private orderService: OrdersService)  { 
    this.menuService.getItemsLunch().subscribe(itemsL => {
      this.hamburguesas = itemsL.filter((ele:any) => ele.category ==='Hamburguesas' )
      this.adicionales = itemsL.filter((ele:any) => ele.category ==='Adicionales' )
      this.bebidas = itemsL.filter((ele:any) => ele.category ==='Bebidas' )
      this.acompanamientos = itemsL.filter((ele:any) => ele.category ==='Acompañamientos' )
      this.itemsLunchMenu = itemsL
    })
  }

  ngOnInit() { }

}