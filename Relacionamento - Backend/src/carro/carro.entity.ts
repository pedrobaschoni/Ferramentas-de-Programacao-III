import { IsNotEmpty, IsNumber, Length, Validate } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn } from 'typeorm';
import { LastNameValido } from '../usuario/validator-lastname';
import { Exclude, Expose, Transform } from 'class-transformer';
import { EmailValido } from '../usuario/validator-email';
import { AnoValido } from '../usuario/validator-ano';
import { Usuario } from '../usuario/usuario.entity';

@Entity()
@Unique(["placa"])
export class Carro {
    @PrimaryGeneratedColumn()
    @Exclude()
    codigo: string;

    @IsNotEmpty({ message: 'Modelo do carro não pode ser vazio' })
    @Length(3, 10, { message: 'Modelo do carro precisa ter entre 3 e 10 caracteres' })
    @Column({ name: "modelo_carro", length: 50 })
    modeloCarro: string;

    @IsNotEmpty({ message: 'A placa do carro não pode ser vazio' })
    @Length(7, 7, { message: 'A placa do carro precisa ter 7 caracteres' })
    @Column({ name: "placa", length: 50 })
    placa: string;

    @IsNotEmpty({ message: 'O ano do carro não pode ser vazio' })
    @IsNumber()
    @Column({ name: "ano_carro", type: "int" })
    @Validate(AnoValido)
    ano: number;

    @ManyToOne(() => Usuario, (usuario) => usuario.carros)
    dono: Usuario;
}