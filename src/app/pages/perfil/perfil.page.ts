import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario: any = [];
  userId: any ;
  formAtualizar: FormGroup

  constructor( 
    private firebaseSvc: FirebaseService,
    public authSvc: AuthenticationService,
    private frmBuilder: FormBuilder,
    private toastController: ToastController)  { }

  ngOnInit() {
    this.initializeForm();
    const email = JSON.parse(localStorage.getItem('user')).email;  
    this.firebaseSvc.loadUser(email).subscribe(res => {
      this.usuario = res.map(data => {
        this.userId = data.payload.doc.id
        return {          
          nome: data.payload.doc.data()['nome'],
          sobrenome: data.payload.doc.data()['sobrenome'],
          endereco: data.payload.doc.data()['endereco']  
        };
      })[0]       
    })
  }

  initializeForm() {
    this.formAtualizar = this.frmBuilder.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],    
      endereco: ["", Validators.required],     
    })
  }

  async synchronizeUser() {
    this.firebaseSvc.updateUser(this.userId, this.formAtualizar.value)
    this.formAtualizar.reset();    

    const toast = await this.toastController.create({
      color: 'dark',
      duration: 2000,
      message: 'Usuário sincronizado',     
    });

    await toast.present();
  }

}
