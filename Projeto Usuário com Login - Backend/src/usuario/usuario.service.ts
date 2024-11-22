import { Injectable } from '@nestjs/common';
import { usuarios } from 'src/db/usuarios-data';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Like, Repository, DeleteResult } from 'typeorm';

@Injectable()
export class UsuarioService {

    private usuarios: any = {};

    constructor(@InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,) {
        this.usuarios = usuarios;
        console.log(usuarios);
    }

    

    public teste(): void {
        console.log("Espero que funcione...")
    }

    public retornarUsuarios(): any {
        return usuarios;
    }

    public getUsuarioEmail(email: string): Promise<Usuario> {
        return this.usuarioRepository.findOne({ where: { email } });
    }
    

    public inserir(usuario: Usuario): Promise<Usuario> {
        return this.usuarioRepository.save(usuario);    
    }
    
    public buscarTodos(): Promise<Usuario[]> {
        return this.usuarioRepository.find();
    }

    public excluir(id: number): Promise<DeleteResult> {
        return this.usuarioRepository.delete(id);
    }

    public usuarioSemAvatar() {
        return this.usuarioRepository.find({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
            },
        })
    }

    public usuarioPorNome(nome: string) {
        return this.usuarioRepository.find({
            where: {
                firstName: nome,
            },
        })
    }

    public usuarioPorId(id: string) {
        return this.usuarioRepository.find({
            where: {
                id: id,
            },
        })
    }

    public usuarioPorNomeOuSobrenome(nome: string) {
        return this.usuarioRepository.find({
            where: [
                {firstName: Like (`${nome}%`)},
                {lastName: Like (`${nome}%`)}
            ]
        })
    }
    
}
