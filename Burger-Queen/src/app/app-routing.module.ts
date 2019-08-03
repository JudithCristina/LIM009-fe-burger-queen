import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TakeOrderComponent } from './take-order/take-order.component';
import { HomeComponent } from './home/home.component'
import {OrderListComponent} from  './order-list/order-list.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  // {
  //   path: 'mesero',
  //   component: BuyerInfoComponent
  // },
  {
    path: 'mesero/take-order',
    component: TakeOrderComponent
  },
  {
    path: 'cocinero/order-list',
    component: OrderListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
