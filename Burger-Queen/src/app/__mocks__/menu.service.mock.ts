import { of } from 'rxjs';

export class MockMenuService {

  getItemsBreakfast() {
    return of([])
  }

  getItemsLunch() {
    return of([])
  }

  sendOrderToKitchen() {}

  getDataNumeroDePedidos() {}
}