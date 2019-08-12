import { async, ComponentFixture, TestBed, getTestBed } from "@angular/core/testing";
import { BreakfastMenuComponent } from "./breakfast-menu.component";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { OrdersService } from '../services/orders.service';
import { MenuService } from '../services/menu.service';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockMenuService {

  getItemsBreakfast() {
    return of([{
      id: '1',
      name: 'Burger',
      price: 10,
      image: 'https://google.com/'
    },
    {
      id: '12',
      name: 'Coffee',
      price: 5,
      image: 'https://google.com/'
    }])
  }
}

describe('BreakfastMenuComponent', () => {
  let component: BreakfastMenuComponent;
  let fixture: ComponentFixture<BreakfastMenuComponent>;
  let serviceMenu: MenuService;
  let serviceOrder: OrdersService;
  let injector: TestBed;
  let fireMock: HttpTestingController;
  let debugElement: DebugElement;
  let template : HTMLElement

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakfastMenuComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        OrdersService,
        { provide: MenuService, useClass: MockMenuService }
      ]
    })
    .compileComponents();
    injector = getTestBed();
    serviceMenu = injector.get(MenuService);
    serviceOrder = injector.get(OrdersService)
    fireMock = injector.get(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakfastMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fireMock.verify();
  });

  it('Should create BreakfastMenuComponent', () => {
    expect(component).toBeTruthy()
  });

  it('Deberia asignar un valor a itemsBreakfastMenu al crear el componente', () => {
    const dummyMenu = [
      {
        id: '1',
        name: 'Burger',
        price: 10,
        image: 'https://google.com/'
      },
      {
        id: '12',
        name: 'Coffee',
        price: 5,
        image: 'https://google.com/'
      }
    ];

    serviceMenu.getItemsBreakfast().subscribe(item => {
      component.itemsBreakfastMenu = item;
      fixture.detectChanges();
    });
    expect(component.itemsBreakfastMenu).toEqual(dummyMenu);
  });

  it('Debería retornar el nombre del producto en la etiqueta h5', () => {
    debugElement = fixture.debugElement.query(By.css('h5'));
    template = debugElement.nativeElement;
    expect(template.textContent).toEqual('Burger');
  });

  it('Debería retornar el precio de producto', () => {
    debugElement = fixture.debugElement.query(By.css('p'));
    template = debugElement.nativeElement;
    expect(template.textContent).toEqual('Precio: $10.00')
  });

  it('Debería asignar un valor a component.productAdded al ejecutar addItemToMenuService', () => {
    component.addItemToMenuService('1');
    fixture.detectChanges();
    expect(component.productAdded).toEqual({id: '1', name: 'Burger', price: 10, quantity: 1, priceTotal: 10})
  });
  
  it('Deberia de llamar a orderService.addProduct al ejecutar addItemToMenuService', () => {
    spyOn(serviceOrder, 'addProduct');    
    component.addItemToMenuService('12');
    fixture.detectChanges();
    expect(serviceOrder.addProduct).toHaveBeenCalled();
  });
});