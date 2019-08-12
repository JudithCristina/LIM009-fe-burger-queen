import { async, ComponentFixture, TestBed, getTestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../services/orders.service';
import { DataService } from '../data.service';
import { MenuService } from '../services/menu.service';
import { of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

class MockMenuService {
  getDataNumeroDePedidos() {
    return of([]);
  }
  sendOrderToKitchen() {
    return Promise.resolve({})
  }
}

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;
  let serviceMenu: MockMenuService;
  let serviceOrder: OrdersService;
  let serviceData: DataService;
  let injector: TestBed;
  let fireMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [ 
        OrdersService,
        DataService,
        { provide:  MenuService, useClass: MockMenuService }
      ]
    })
    .compileComponents();
    injector = getTestBed();
    serviceMenu = injector.get(MenuService);
    serviceOrder = injector.get(OrdersService);
    serviceData = injector.get(DataService);
    fireMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fireMock.verify();
  });

  it('should create OrderComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Debería actualizar la fecha al iniciar el componente', () => {
    let date = new Date()
    component.ngOnInit()
    fixture.detectChanges();
    expect(component.fecha).toEqual(date);
  });

  it('Debería restar -1 a la cantidad del producto y restar al precioTotal', () => {
    serviceOrder.arrProduct = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 2,
      priceTotal: 20
    },
    {
      id: '12',
      name: 'Coca Cola',
      price: 5,
      image: 'https://google.com/',
      quantity: 3,
      priceTotal: 15
    }];

    component.eliminar(1)
    fixture.detectChanges()
    expect(serviceOrder.arrProduct[1].quantity).toBe(2)
    expect(serviceOrder.arrProduct[1].priceTotal).toBe(10)
  });

  it('Debería enviar orden a -la cocina- invocando sendOrder', fakeAsync(() => {
    const objData = {
          clientName: 'Fran',
          products: [{
            id: '1',
            name: 'CheeseBurger',
            price: 10,
            image: 'https://google.com/',
            quantity: 2,
            priceTotal: 20
          },
          {
            id: '12',
            name: 'Coca Cola',
            price: 5,
            image: 'https://google.com/',
            quantity: 3,
            priceTotal: 15
          }],
          time: new Date(),
          status: 'Pendiente',
          total: 35
        };

    spyOn(serviceMenu, 'sendOrderToKitchen').and.returnValue(Promise.resolve(objData));
    spyOn(serviceOrder, 'resetOrder');
    component.sendOrder();
    tick();
    fixture.detectChanges();
    expect(serviceMenu.sendOrderToKitchen).toHaveBeenCalled();
    expect(serviceOrder.resetOrder).toHaveBeenCalled();
  }));

  it('Debería registrar el número de orden', () => {
    const dataPedidos = [{
      clientName: 'Fran',
      products: [{
        id: '1',
        name: 'CheeseBurger',
        price: 10,
        image: 'https://google.com/',
        quantity: 2,
        priceTotal: 20
      },
      {
        id: '12',
        name: 'Coca Cola',
        price: 5,
        image: 'https://google.com/',
        quantity: 3,
        priceTotal: 15
      }],
      time: new Date(),
      status: 'Pendiente',
      total: 35
    }];

    spyOn(serviceMenu, 'getDataNumeroDePedidos').and.returnValue(of(dataPedidos))
    component.registrarNumeroDeOrden()
    fixture.detectChanges()
    expect(serviceMenu.getDataNumeroDePedidos).toHaveBeenCalled()
    expect(component.numeroDePedidos).toBe(2)
  });
});