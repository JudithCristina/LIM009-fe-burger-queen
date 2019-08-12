import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFirestoreMock } from "../__mocks__/angular.firestore.mock";

const fixtureData = [
  {
    id: '1',
    data: {name: 'CheeseBurger',
    price: 10,
    image: 'https://google.com/',
    quantity: 1,
    priceTotal: 10}
  },
  {
    id: '2',
    data: {name: 'InkaCola',
    price: 5,
    image: 'https://google.com/',
    quantity: 1,
    priceTotal: 5}
  },
  {
    id: '3',
    data: {name: 'CocaCola',
    price: 5,
    image: 'https://google.com/',
    quantity: 1,
    priceTotal: 5}
  }
]

describe('MenuService', () => {

  let serviceMenu: MenuService;
  let angularFirestore: AngularFirestoreMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AngularFirestore,
          useValue: new AngularFirestoreMock(fixtureData)
        }
      ],
      imports: [AngularFirestoreModule]
    })

   
  });

  beforeEach(() => {
    serviceMenu = TestBed.get(MenuService)
  })

  it('Should create MenuService', () => {
    expect(serviceMenu).toBeTruthy();
  });

  it('Debería cargar el menú de desayuno', fakeAsync(() => {
    let result;
    serviceMenu.getItemsBreakfast().subscribe(r => {
      result = r
    })
    tick()
    expect(result.length).toEqual(3)
  }));

  it('Debería cargar el menú de almuerzo', fakeAsync(() => {
    let result;
    serviceMenu.getItemsLunch().subscribe(r => {
      result = r
    })
    tick()
    expect(result.length).toEqual(3)
  }))
});