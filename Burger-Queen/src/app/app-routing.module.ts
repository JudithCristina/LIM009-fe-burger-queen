import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuyerInfoComponent } from './buyer-info/buyer-info.component';
import { TakeOrderComponent } from './take-order/take-order.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'mesero',
    component: BuyerInfoComponent
  },
  {
    path: 'take-order',
    component: TakeOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
