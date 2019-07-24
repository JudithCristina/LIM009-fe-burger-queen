import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';
import { Item } from '../models/Item';
import { OrdersService } from '../services/orders.service';

@Component({
  selector: 'app-breakfast-menu',
  templateUrl: './breakfast-menu.component.html',
  styleUrls: ['./breakfast-menu.component.css']
})
export class BreakfastMenuComponent implements OnInit {
  itemsBreakfastMenu: Item[];
  itemBreakfast:string;
  productAdded:object;

  addItemToMenuService(itemBreakfastID) {
    for (let i = 0; i < this.itemsBreakfastMenu.length; i++) {
      if (this.itemsBreakfastMenu[i].id === itemBreakfastID) {
        this.productAdded = {
          id: itemBreakfastID,
          name: this.itemsBreakfastMenu[i].name,
          price: this.itemsBreakfastMenu[i].price,
          quantity: 1,
          priceTotal: this.itemsBreakfastMenu[i].price}
      }
    }
    this.orderService.addProduct(this.productAdded)
  }

  constructor(private menuService: MenuService, private orderService: OrdersService) {
    this.menuService.getItemsBreakfast().subscribe(itemsB => {
      this.itemsBreakfastMenu = itemsB
    })    
  }


  ngOnInit() { }

}