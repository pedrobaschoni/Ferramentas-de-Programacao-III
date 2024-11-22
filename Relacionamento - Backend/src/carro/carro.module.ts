import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroController } from './carro.controller';
import { CarroService } from './carro.service';
import { Carro } from './carro.entity';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Carro]),
    UsuarioModule,  
  ],
  controllers: [CarroController],
  providers: [CarroService],
})
export class CarroModule {}
