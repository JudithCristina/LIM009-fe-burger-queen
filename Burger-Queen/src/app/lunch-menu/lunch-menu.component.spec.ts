import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { LunchMenuComponent } from './lunch-menu.component';
import { FormsModule } from '@angular/forms';
import { MenuService } from '../services/menu.service';
import { OrdersService } from '../services/orders.service';
import { of } from 'rxjs';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

class MockMenuService {
  getItemsLunch() {
    return of([{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/'
    },
    {
      id: '12',
      name: 'Coca Cola',
      price: 5,
      image: 'https://google.com/'
    }])
  }
}

describe('LunchMenuComponent', () => {
  let component: LunchMenuComponent;
  let bebidas: DebugElement;
  let fixture: ComponentFixture<LunchMenuComponent>;
  let serviceMenu: MenuService;
  let serviceOrder: OrdersService;
  let injector: TestBed;
  let fireMock: HttpTestingController;
  let debugElement: DebugElement;
  let template: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchMenuComponent ],
      imports: [ FormsModule, HttpClientTestingModule ],
      providers: [
        OrdersService,
        { provide: MenuService, useClass: MockMenuService }
        ]
    })
    .compileComponents();
    injector = getTestBed();
    serviceMenu = injector.get(MenuService);
    serviceOrder = injector.get(OrdersService);
    fireMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchMenuComponent);
    component = fixture.componentInstance;
   
    fixture.detectChanges();
  });

  afterEach(() => {
    fireMock.verify();
  });

  it('Should create LunchMenuComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Deberia asignar un valor a itemsLunchMenu al crear el componente', () => {
    const dummyMenu = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/'
    },
    {
      id: '12',
      name: 'Coca Cola',
      price: 5,
      image: 'https://google.com/'
    }];

    serviceMenu.getItemsLunch().subscribe(item => {
      component.itemsLunchMenu = item;
      fixture.detectChanges();
    });

    expect(component.itemsLunchMenu).toEqual(dummyMenu);
  });

  it('Debería imprimir el nombre del producto en una etiqueta h5', () => {
    component.bebidas = [{
      id: '1',
      name: 'InkaCola',
      price: 10,
      image: 'https://google.com/'
    },
    {
      id: '12',
      name: 'Coca Cola',
      price: 5,
      image: 'https://google.com/'
    }];
    fixture.detectChanges()

    bebidas = fixture.debugElement.nativeElement.querySelector('[data-id="bebidas"]')
    expect(bebidas.children.length).toBe(2)
    expect(fixture.debugElement.nativeElement.querySelector('[data-id="bebidas"]:nth-child(1) h5').textContent).toBe('InkaCola')
  });

  it('Debería asignar un valor a component.productAdded al ejecutar addItemToMenuService', () => {
    component.addItemToMenuService('1', false );
    fixture.detectChanges();
    expect(component.productAdded).toEqual({id: '1', name: 'CheeseBurger', typeOfBurger: '', additional: '', price: 10, quantity: 1, priceTotal: 10})
  });

  it('Deberia de llamar a orderService.addProduct al ejecutar addItemToMenuService', () => { //NOT WORKING
    spyOn(serviceOrder, 'addProduct');
    component.addItemToMenuService('1');
    fixture.detectChanges();
    expect(serviceOrder.addProduct).toHaveBeenCalled();
  });
});