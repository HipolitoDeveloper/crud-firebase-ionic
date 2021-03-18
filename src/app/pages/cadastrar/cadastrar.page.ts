import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  formCadastro: FormGroup
  constructor( 
    private firebaseSvc: FirebaseService,
    public authSvc: AuthenticationService,
    private frmBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formCadastro = this.frmBuilder.group({
      nome: ["", Validators.required],
      sobrenome: ["", Validators.required],
      email: ["", Validators.required],
      endereco: ["", Validators.required],
      senha: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  cadastrarUsuario() {
    if(this.formCadastro.status == 'VALID') {
      this.authSvc.RegisterUser(this.formCadastro.get("email").value, this.formCadastro.get("senha").value)      
      .then((res) => {   
        this.firebaseSvc.createUser(this.formCadastro.value).then(() => window.alert("Usuário cadastrado com sucesso"))
      }).catch((error) => {
        window.alert("Não foi possível concluir o cadastro")
      })
    }
  }

}
