import { IsNotEmpty, Length, Validate } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { LastNameValido } from './validator-lastname';
import { Exclude, Expose, Transform } from 'class-transformer';
import { EmailValido } from './validator-email';
import { Carro } from '../carro/carro.entity';

@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  @Exclude()
  id: string;

  @IsNotEmpty({ message: 'Nome não pode ser vazio' })
  @Length(3, 10, { message: 'Nome precisa ter entre 3 e 10 caracteres' })
  @Expose({ name: 'primeiro_nome' })
  @Column({ name: "first_name", length: 50 })
  firstName: string;

  @IsNotEmpty({ message: 'Ultimo nome não pode ser vazio' })
  @Validate(LastNameValido)
  @Expose({ name: 'ultimo_nome' })
  @Column({ name: "last_name", length: 25 })
  lastName: string;

  @IsNotEmpty({ message: 'O salario não pode ser vazio' })
  @Column({ name: "salario", type: 'decimal', precision: 10, scale: 2})
  salario: number;

  @IsNotEmpty({ message: 'Email não pode ser vazio' })
  @Transform(({ value }) => value.toLowerCase())
  @Validate(EmailValido)
  @Column({ length: 100, nullable: true })
  email: string;

  @IsNotEmpty({ message: 'A senha não pode ser vazia' })
  @Column({ name: "password", length: 25 })
  password: string;

  @IsNotEmpty({ message: 'Avatar não pode ser vazio' })
  @Column({ length: 100 })
  avatar: string;

  @OneToMany(() => Carro, (carro) => carro.dono)
  carros: Carro[];

}
