import { of } from 'rxjs';

export class AngularFirestoreMock {
  constructor(private data){
    this.data = data
  }
 
  add(objData, nameCollection) {
    return new Promise((resolve) => {
      resolve({
        data: objData,
        id: 'ABC123',
        collection: nameCollection
      })
    })
  }

  snapshotChanges() {
    const actions = this.data.map(doc => {
      return {
        payload: {
          doc: {
            id: doc.id,
            data: () => doc.data
          }
        }
      }
    })
    return of(actions)
  }

  collection(nameCollection) {
    return {
      add: (objData) => this.add(objData, nameCollection),
      snapshotChanges: () =>  this.snapshotChanges()
    }
  }
}