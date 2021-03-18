import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirebaseService } from 'src/app/services/firebase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {  
  formCadastro: FormGroup;
  isSignup: boolean = false;
  buttonTitle: any = '';
  constructor(
    private frmBuilder: FormBuilder,   
    public nav: NavController,
    public authSvc: AuthenticationService,
    public firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.formCadastro = this.frmBuilder.group({
      nome: [""],
      sobrenome: [""],
      email: ["", Validators.required],
      senha: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  logar() {
    if(this.formCadastro.status == 'VALID') {
      this.authSvc.SignIn(this.formCadastro.get("email").value, this.formCadastro.get("senha").value)    
      .then((res) => {     
        this.nav.navigateForward('perfil')  
      }).catch((error) => {
        window.alert("Usuário ou senha inválido")
      })
    }
  }

  cadastrar() {
    if(this.formCadastro.status == 'VALID') {     
      this.authSvc.RegisterUser(this.formCadastro.get("email").value, this.formCadastro.get("senha").value)      
      .then((res) => {   
        this.firebaseSvc.createUser(this.formCadastro.value) 
      }).catch((error) => {
        window.alert("Não foi possível concluir o cadastro")
      })
    }
  }

  changePageFunction() {
    this.isSignup  = !this.isSignup;
  }

}
