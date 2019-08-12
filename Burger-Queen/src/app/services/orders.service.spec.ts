import { TestBed } from '@angular/core/testing';

import { OrdersService } from './orders.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('OrdersService', () => {
  let serviceOrder: OrdersService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdersService]
    });

    serviceOrder = TestBed.get(OrdersService)
    httpMock = TestBed.get(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Debería crear OrdersService', () => {
    const service: OrdersService = TestBed.get(OrdersService);
    expect(service).toBeTruthy();
  });

  it('Debería agregar el producto a la orden, iniciando con un array vacío', () => {
    const productOne = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    }];

    serviceOrder.addProduct(productOne);
    expect(serviceOrder.arrProduct.length).toBe(1);
    expect(serviceOrder.arrProduct[0]).toEqual(productOne);

  });

  it('Debería agregar el nuevo producto a la orden cuando la orden ya tiene un elemento', () => {
    serviceOrder.arrProduct = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    }];

    const productTwo = [{
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    }];

    serviceOrder.addProduct(productTwo);
  
    expect(serviceOrder.arrProduct.length).toBe(2);
  });

  it('Debería sumar quantity y multiplicar priceTotal al agregar un producto que ya esté en la orden', () => {
    serviceOrder.arrProduct = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    },
    {
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    },
    {
      id: '3',
      name: 'CocaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    }];

    const productThree = {
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    };

    serviceOrder.addProduct(productThree);
  
    expect(serviceOrder.arrProduct.length).toBe(3);
    expect(serviceOrder.filteredArrProduct.length).toBe(2);
    expect(serviceOrder.arrProduct[1].quantity).toBe(2)
    expect(serviceOrder.arrProduct[1].priceTotal).toBe(10)
  });

  // it('Pending: hamburguesas con adicionales', () => {

  // });

  it('Debería dar el total del pedido', () => {
    serviceOrder.arrProduct = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    },
    {
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    },
    {
      id: '3',
      name: 'CocaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    }];

    serviceOrder.totalDePedidos()

    expect(serviceOrder.arrCalculate).toBe(20)
  });

  it('Debería eliminar un producto', () => {
    serviceOrder.arrProduct = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    },
    {
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    },
    {
      id: '3',
      name: 'CocaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    }];

    const newArrayWithoutDeletedItem = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    },
    {
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    }];

    serviceOrder.eliminarProducto(2)
    expect(serviceOrder.arrProduct.length).toBe(2)
    expect(serviceOrder.arrProduct).toEqual(newArrayWithoutDeletedItem)
  });

  it('Debería borrar la información de la orden', () => {
    serviceOrder.arrProduct = [{
      id: '1',
      name: 'CheeseBurger',
      price: 10,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 10
    },
    {
      id: '2',
      name: 'InkaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    },
    {
      id: '3',
      name: 'CocaCola',
      price: 5,
      image: 'https://google.com/',
      quantity: 1,
      priceTotal: 5
    }];

    serviceOrder.resetOrder();

    expect(serviceOrder.arrProduct).toEqual([])
  })
});