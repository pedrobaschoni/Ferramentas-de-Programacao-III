import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { LocalStrategy } from './local.strategy';


@Module({
    imports: [PassportModule, UsuarioModule],
    controllers: [],
    providers: [LocalStrategy],
})
export class AuthModule { }