import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthenticationService } from './services/authentication.service';
// import { SplashScreen } from '@ionic-native/';
// import { StatusBar } from '@ionic/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentPageTitle = 'Dashboard';

  menuItems = [];
  constructor(   
    private authSvc: AuthenticationService
  ) {
    this.menuItems = [
      {
        title: 'Perfil',
        url: '/perfil',
        icon: 'easel',      
      },
      {
        title: 'Cadastrar Usuário',
        url: '/cadastrar',
        icon: 'settings',        
      },
      {
        title: 'Lista de Usuários',
        url: '/usuarios',
        icon: 'film',      
      },    
    ];
  }

}
