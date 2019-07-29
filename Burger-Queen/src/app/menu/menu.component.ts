import { Component, OnInit } from '@angular/core';
// import { MenuService } from '../services/menu.service';
// import { Item } from '../models/Item';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  showActiveBreakfast: boolean =true;
  showActiveLunch:boolean = false
  showBreakfast: boolean = true;
  showLunch: boolean = false;
  showItem:boolean = true

  constructor( ) { }

  ngOnInit() { }

  openBreakfastMenu() {
    this.showBreakfast = true;
    this.showLunch = false;
    this.showActiveBreakfast = true
    this.showActiveLunch = false
  }

  openLunchMenu() {
    this.showLunch = true;
    this.showBreakfast = false;
    this.showActiveLunch = true
    this.showActiveBreakfast = false
  }

}