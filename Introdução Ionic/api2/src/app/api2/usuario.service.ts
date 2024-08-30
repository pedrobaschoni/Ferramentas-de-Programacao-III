import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlBase = "https://reqres.in/api";

  constructor(private http: HttpClient) {}

   public obterTodos(pagina: number) {
    return this.http.get(`${this.urlBase}/users?page${pagina}`)
      
      
  }
}
