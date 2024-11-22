import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public usuario: any = {};

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {}

  public async login() {
    const resposta = await this.authenticationService.login(this.usuario);
    if (resposta != null) {
      this.router.navigate(['/usuario']);
    }
  }


}
