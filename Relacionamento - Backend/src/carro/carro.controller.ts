import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import { get } from 'http';
import { Usuario } from '../usuario/usuario.entity';
import { AuthGuard } from '@nestjs/passport';
import { CarroService } from './carro.service';
import { Carro } from './carro.entity';


@Controller('carro') // A rota base é /carro
export class CarroController {
  constructor(private carroService: CarroService) {}

  @Post() // Rota para POST em /carro
  public async inserir(@Body() carro: Carro): Promise<Carro> {
    const carroCriado = await this.carroService.inserir(carro);
    return carroCriado;
  }

  @Get('listarComDono')
    public async listarCarrosComDono(): Promise<Carro[]> {
        return this.carroService.listarCarrosComDono();
    }

    @Get('carroPorPlaca/:placa')
    public async buscarPorPlaca(@Param('placa') placa: string): Promise<Carro> {
      const carro = await this.carroService.buscarPorPlaca(placa);
      if (!carro) {
        throw new NotFoundException(`Carro com placa ${placa} não encontrado.`);
      }
      return carro;
    }

    @Delete('deletarPorCodigo/:codigo')
    public async deletarPorCodigo(@Param('codigo') codigo: string): Promise<void> {
      await this.carroService.deletarPorCodigo(codigo);
    }
}


