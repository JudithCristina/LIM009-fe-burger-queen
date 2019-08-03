import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

export class OrderListComponent implements OnInit {

  totalOrder : any
  timeLeft: number = 60; 
  interval; 
  startTimer() { this.interval = setInterval(() => { if(this.timeLeft > 0) { this.timeLeft--; } else { this.timeLeft = 60; } },1000) } 
  pauseTimer() { clearInterval(this.interval); }
  constructor(private menuService: MenuService) { 
    this.MostrarOrder()
  }


  MostrarOrder(){
    this.menuService.getDataNumeroDePedidos().subscribe(dataPedidos => {
      this.totalOrder = dataPedidos
    })
  }

  ngOnInit() {
    
  }

}
