import { Injectable, NotFoundException } from '@nestjs/common';
import { usuarios } from 'src/db/usuarios-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, DeleteResult } from 'typeorm';
import { Carro } from './carro.entity';

@Injectable()
export class CarroService {

    private carros: any = {};

    constructor(@InjectRepository(Carro)
    private carroRepository: Repository<Carro>,) {
    }

    public inserir(carro: Carro): Promise<Carro> {
        return this.carroRepository.save(carro);    
    }

    public async listarCarrosComDono(): Promise<Carro[]> {
        return this.carroRepository.find({
            relations: ['dono'], 
        });
    }

    public async buscarPorPlaca(placa: string): Promise<Carro> {
        const carro = await this.carroRepository.findOne({
            where: { placa },
            relations: ['dono'], // Inclui o relacionamento com o dono
        });

        if (!carro) {
            throw new NotFoundException('Carro não encontrado com a placa fornecida.');
        }

        return carro;
    }

    public async deletarPorCodigo(codigo: string): Promise<void> {
        const resultado = await this.carroRepository.delete({ codigo });

        if (resultado.affected === 0) {
            throw new NotFoundException(`Carro com código ${codigo} não encontrado.`);
        }
    }

    
}
