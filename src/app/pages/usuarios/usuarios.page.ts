import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})

export class UsuariosPage implements OnInit {
  usuarios = [];
  constructor(
    private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.firebaseSvc.loadUsers().subscribe(res => {
      console.log(res)
        this.usuarios = res.map(data => {
          return {
            id: data.payload.doc.id,
            nome: data.payload.doc.data()['nome'],
            sobrenome: data.payload.doc.data()['sobrenome'],
            endereco: data.payload.doc.data()['endereco'],
            senha: data.payload.doc.data()['senha']
          };
        })
       
    });
  }
}
