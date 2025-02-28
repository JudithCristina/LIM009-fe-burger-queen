import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../models/Item';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menuBreakfastCollection: AngularFirestoreCollection<Item>
  itemsB: Observable<Item[]>
  itemsL: Observable<Item[]>

  private totalOrders= new BehaviorSubject('');
  listOrders= this.totalOrders.asObservable();

  updateOrderReadyToServer(order) {
    return this.angularfs
        .collection("orders")
        .doc(order)
        .update({ status: 'Listo para servir'});
 }
 updateDelivery(order) {
  return this.angularfs
      .collection("orders")
      .doc(order)
      .update({ status: 'Entregado'});
}



  constructor(public angularfs: AngularFirestore) { 
    // this.itemsB = this.angularfs.collection('menuBreakfast').valueChanges();
    // this.itemsL = this.angularfs.collection('menuLunch').valueChanges();
    // this.itemsB = this.angularfs.collection('menuBreakfast').snapshotChanges().pipe(map(changes => {
    //   return changes.map(b => {
    //     const dataB = b.payload.doc.data() as Item
    //     dataB.id = b.payload.doc.id;
    //     return dataB;
    //   });
    // }));
    // this.itemsL = this.angularfs.collection('menuLunch').snapshotChanges().pipe(map(changes => {
    //   return changes.map(l => {
    //     const dataL = l.payload.doc.data() as Item
    //     dataL.id = l.payload.doc.id;
    //     return dataL;
    //   });
    // }));
    
  }

  getItemsBreakfast() {
    return this.angularfs.collection('menuBreakfast', ref => ref.orderBy('name', 'asc')).snapshotChanges()
    .pipe(
      map(response => {
        const arr: Item[] = [];
        response.forEach(function(element){
          const data = element.payload.doc.data() as Item;
          arr.push({
            id: element.payload.doc.id,
            name: data.name,
            price: data.price,
            image: data.image
          })
        })
        return arr;
      })
    );
  }
  
  getItemsLunch() {
    return this.angularfs.collection('menuLunch', ref => ref.orderBy('name', 'asc')).snapshotChanges()
    .pipe(
      map(changes => {
      return changes.map(l => {
        const dataL = l.payload.doc.data() as Item
        dataL.id = l.payload.doc.id;        
        return dataL;
      });
    }));
  }

  sendOrderToKitchen(objArray:object) {
    const orderCollection = this.angularfs.collection('orders');
    // orderCollection.doc(id).add(objArray)
    return orderCollection.add(objArray)
  }

  getDataNumeroDePedidos(){
    return this.angularfs.collection('orders').valueChanges();
   }

   
   getTotalOrders() {
    return this.angularfs.collection('orders', ref => ref.orderBy('time', 'asc')).snapshotChanges()
    .pipe(
      map(response => {
        return response.map(element => {
            const id = element.payload.doc.id;
            const data = element.payload.doc.data()
            return {id, ...data}
          })
        })
    )
  } 

 


  }

