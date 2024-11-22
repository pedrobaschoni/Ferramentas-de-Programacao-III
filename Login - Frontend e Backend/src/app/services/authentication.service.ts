import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private urlBase = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  public async login(usuario: any) {
    console.log(usuario);

    // return this.http.post(`${this.urlBase}/auth/login`, usuario).subscribe({
    //   next: (resposta: any) => {
    //     console.log(resposta.access_token);
    //     this.accessToken = resposta.access_token;
    //     return true;
    //   },
    //   error: (error) => {
    //     //Tratar o erro
    //     return false;
    //   },
    // });

    const resposta: any = await firstValueFrom(
      this.http.post(`${this.urlBase}/auth/login`, usuario)
    );
    if (resposta) {
      localStorage.setItem("TOKEN", resposta.access_token);
      return true;
    }
    return false;
  }

  public getToken() {
    return localStorage.getItem("TOKEN");
  }

  public isLogado() {
    return this.getToken() != null;
  }

  public logout() {
    localStorage.removeItem("TOKEN");
  }
}
