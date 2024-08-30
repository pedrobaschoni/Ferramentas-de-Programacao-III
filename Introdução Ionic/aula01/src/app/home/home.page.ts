import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public nome: string = 'Pedro'; 

  constructor() {
    console.log('Home page component');
  }

  public exibirNome(): void {
    console.log(this.nome);
  }

  // Ou

  nomeDoMetodo() {
    return '';
  }

}
