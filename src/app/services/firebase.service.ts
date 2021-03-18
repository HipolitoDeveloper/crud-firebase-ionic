import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName = 'users'

  constructor(
    private firestore: AngularFirestore
  ) { }

  createUser(record) {
    return this.firestore.collection(this.collectionName).add(record);
  }

  loadUsers() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }

  loadUser(email) {
    return this.firestore.collection(this.collectionName, ref => ref.where("email", "==", email)).snapshotChanges();
  }

  updateUser(recordId, record) {
    this.firestore.doc(this.collectionName + '/' + recordId).update(record);
  }

  deleteUser(recordId) {
    this.firestore.doc(this.collectionName + '/' + recordId).delete();
  }
}
