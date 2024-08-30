import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public nome: string = 'Pedro'; 
  public pos: number = 0;
  public nomes: string[] = [];

  constructor() {
    console.log('Home page component');
  }

  public adicionar(): void {
    this.nomes.push(this.nome);

    this.pos += 1;

    console.log(this.nomes);
  }

  public excluir(index: number) {
    console.log('Método excluir');

    this.pos -= 1;

    this.nomes.splice(index, 1);
  }


}
