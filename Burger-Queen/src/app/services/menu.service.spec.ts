import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


describe('MenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AngularFirestore
      ]
    })
  });

  it('should be created', () => {
    const service: MenuService = TestBed.get(MenuService);
    expect(service).toBeTruthy();
  });
});
