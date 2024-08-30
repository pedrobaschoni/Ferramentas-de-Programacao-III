import { Component } from '@angular/core';
import { UsuarioService } from '../api2/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  private pagina = 1;


  constructor(private usuarioService: UsuarioService) {
    this.carregarUsuario();
  }

  private carregarUsuario() {
    this.usuarioService.obterTodos(this.pagina)
    .subscribe( (dados) => {
      console.log(dados);
    });
  }
  
}
