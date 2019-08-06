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

  hamburguesasS: Item[];
  hamburguesasD: Item[];
  bebidas: Item[];
  acompanamientos: Item[];
  adicionales: Item[];

  itemsLunchMenu: Item[];
  productAdded:object;
  adicionalesHambur:string
  
  addItemToMenuService(itemLunchID,adicional1?:boolean, adicional2?:boolean) {
    for (let i = 0; i < this.itemsLunchMenu.length; i++) {
      if (this.itemsLunchMenu[i].id === itemLunchID) {
        this.productAdded = {
          id: itemLunchID,
          name: this.itemsLunchMenu[i].name,
          typeOfBurger: '',
          additional1: adicional1=== true ? "con huevo" :(adicional1 === false ? " " : "") ,
          additional2: adicional2=== true ? "con queso" :(adicional1 === false ? " " : ""),
          quantity: 1,
          price: this.itemsLunchMenu[i].price,
          priceTotal: this.itemsLunchMenu[i].price}
      }
      console.log(this.productAdded)
    }
    this.orderService.addProduct(this.productAdded)
  }
  constructor(private menuService: MenuService, private orderService: OrdersService)  { 
    this.menuService.getItemsLunch().subscribe(itemsL => {
      this.hamburguesasS = itemsL.filter((ele:any) => ele.subcategory ==='Hamburguesas simples' )
      this.hamburguesasD = itemsL.filter((ele:any) => ele.subcategory ==='Hamburguesas dobles' )
      this.adicionales = itemsL.filter((ele:any) => ele.category ==='Adicionales' )
      this.bebidas = itemsL.filter((ele:any) => ele.category ==='Bebidas' )
      this.acompanamientos = itemsL.filter((ele:any) => ele.category ==='Acompañamientos' )
      this.itemsLunchMenu = itemsL
    })
  }

  ngOnInit() { }

}