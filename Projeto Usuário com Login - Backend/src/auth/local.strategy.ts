import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UsuarioService } from "src/usuario/usuario.service";
import { UnauthorizedException } from '@nestjs/common'
import { Usuario } from "src/usuario/usuario.entity";
import { Injectable } from "@nestjs/common/decorators";
import { emit } from "process";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly usuarioService: UsuarioService) {
        super({ usernameField: 'email', passwordField: 'password' });
    }

    async validate(email: string, password: string): Promise<Usuario> {
        const usuario: Usuario = await this.usuarioService.getUsuarioEmail(email);
        if (email === undefined) {
            throw new UnauthorizedException();
        }
        if (email !== undefined && usuario.password === password) {
            return usuario;
        }
        else {
            throw new UnauthorizedException();
        }
    }
}