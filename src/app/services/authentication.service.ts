import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';
import { FirebaseService } from './firebase.service';

export interface User {
  id: string;
  email: string; 
  nome: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  user: any;

  constructor( 
    public firebaseSvc: FirebaseService,
    public nav: NavController,
    public fireAuth: AngularFireAuth) 
    {
      this.fireAuth.authState.subscribe(user => {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
          JSON.parse(localStorage.getItem('user'));
        } else {
          localStorage.setItem('user', null);
          JSON.parse(localStorage.getItem('user'));
        }
      })
    }

    SignIn(email, password) {
      return this.fireAuth.signInWithEmailAndPassword(email, password)      
    }
  
   
    RegisterUser(email, password) {
      return this.fireAuth.createUserWithEmailAndPassword(email, password)
    }

    SignOut() {    
      return this.fireAuth.signOut().then(() => {
        localStorage.removeItem('user');
        this.nav.navigateForward(['login']);
      })
    }
}
