import { Body, Controller, Delete, Get, Param, Post, Request, Res, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { get } from 'http';
import { Usuario } from './usuario.entity';
import { AuthGuard } from '@nestjs/passport';


@Controller('usuario')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {
        const vet: any = {
            'id': 1,
            'firstName': 'Pedro',
            'lastName': 'Lucas',
            'email': 'ppp@ppp',
            'avatar': 'aaa'
        };

        // usuarioService.inserir(vet);
        // usuarioService.excluir(1);
    }

    @Get('usuarioSemAvatar')
    public nomeSemAvatar() {
        return this.usuarioService.usuarioSemAvatar();
    }

    @Get('porNome/:firstName')
    public retornarUsuarioPeloNome(@Param('firstName') nome: string): any {
        return this.usuarioService.usuarioPorNome(nome);
    }

    @Get('porId/:id')
    public retornarUsuarioPeloId(@Param('id') id: string): any {
        return this.usuarioService.usuarioPorId(id);
    }

    @Get('porNomeOuSobrenome/:nomes')
    public retornarUsuarioPeloNomeOuSobrenome(@Param('nomes') nome: string): any {
        return this.usuarioService.usuarioPorNomeOuSobrenome(nome);
    }

    @Delete('excluirUsuario/:id')
    public async excluirUsuario(@Param('id') id: number): Promise<string> {
        await this.usuarioService.excluir(id);
        return `Usuário com ID ${id} excluído com sucesso.`;
    }

    @Get('salario/:salario')
    findOne(@Param('salario') salario: string) {
        return salario;
    }

// Não faz parte daqui para baixo
    @Get('detalhes')
    public retornarUsuarios(): string {
        const usuarios: any = this.usuarioService.retornarUsuarios().data;
        return usuarios;
    }

    @Get('usuario')
    public retornarUsuariosSemDetalhes(): string {
        const usuarios: any = this.usuarioService.retornarUsuarios();
        return usuarios;
    }

    @Get('teste')
    public teste(): string{
        return 'Teste';
    }

    @Get('semAvatar')
    public retornarSemAvatar(): any {
        const usuarios: any = this.usuarioService.retornarUsuarios();
        const usuariosSemAvatar = usuarios.data.map(({ avatar, ...usuario }) => usuario);
        return { ...usuarios, data: usuariosSemAvatar };
    }

    @Get('usuariosPersonalizados')
    public retornarUsuarporIdiosPersonalizados(): any {
        const usuarios: any = this.usuarioService.retornarUsuarios();
        const usuariosPersonalizados = usuarios.data.map(({ id, first_name, last_name, email }) => ({
            id,
            nomeCompleto: `${first_name} ${last_name}`,
            email
        }));
        return { ...usuarios, data: usuariosPersonalizados };
    }

    @Get('id/:id')
    public retornarUsuarioPorId(@Param('id') id: number): any {
        const usuarios: any = this.usuarioService.retornarUsuarios().data;
        for(let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].id == id)
                return usuarios[i];
        }

        return 'Usuário não encontrado';
    }

    @Get('firstName/:first_name')
    public retornarUsuarioPeloPrimeiroNome(@Param('first_name') nome: string): any {
        const usuarios: any = this.usuarioService.retornarUsuarios().data;
        for(let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].first_name == nome)
                return usuarios[i];
        }
        return 'Usuário não encontrado'

    }

    @Get('lastName/:last_name')
    public retornarUsuarioPeloUltimoNome(@Param('last_name') nome: string): any {
        const usuarios: any = this.usuarioService.retornarUsuarios().data;
        for(let i = 0; i < usuarios.length; i++) {
            if(usuarios[i].last_name == nome)
                return usuarios[i];
        }
        return 'Usuário não encontrado'

    }

    public vetor: string[] = ['PedAbigailro','Lucas','Calvo']
    // GET /usuario --> Obter todos os usuários

    // /usuario
    @Get()
    public hello(): string{3000
        return 'Hello World';
    }

    // GET /usuario/1 --> Obter um usário
    @Get(':id')
    public obterPorCodigo(@Param('id') codigo: string): number{
        // Tudo que vem do Param é uma string, mesmo mudando o valor para double ou float ainda sim será uma string
        return parseInt(codigo )+
        parseInt(codigo);
    }

    @Post('/login')
    @UseGuards(AuthGuard('local'))
    login(@Request() req) {
        const usuario = req.usuario; // O usuário autenticado
        return {
            message: 'Login bem-sucedido!',
            user: usuario,
        };
    }

    // /usuario

    //Criar um usuario. Dados são recebidos por parâmetro
    @Post()
    public async inserir(@Body() usuario: Usuario): Promise<Usuario> {
      const usuarioCriado = await this.usuarioService.inserir(usuario);
      return usuarioCriado; // Retorna o objeto do usuário criado
    }
}

